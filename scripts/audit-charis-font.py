#!/usr/bin/env python3
"""Audit the self-hosted Charis 7 font against the project's UFPN inventory.

Requires fonttools, brotli and uharfbuzz. Fails closed for missing glyphs,
missing mark-to-base anchors used by UFPN, missing mark-to-mark anchors used
by stacked UFPN graphemes, or HarfBuzz .notdef output.
"""
from __future__ import annotations

import io
import json
import unicodedata
from pathlib import Path

import uharfbuzz as hb
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
MAPPING = ROOT / "data/ufpn-mapping.json"
FONT_PATH = ROOT / "assets/fonts/Charis-Regular.woff2"


def lookup_subtables(font: TTFont, feature_tag: str, script_tag: str = "cyrl"):
    """Yield only lookups enabled by the requested OpenType script system."""
    gpos = font["GPOS"].table
    lookup_list = gpos.LookupList.Lookup
    feature_records = gpos.FeatureList.FeatureRecord
    script_record = next(
        (record for record in gpos.ScriptList.ScriptRecord if record.ScriptTag == script_tag),
        None,
    )
    if script_record is None:
        raise SystemExit(f"Font has no {script_tag!r} GPOS script system")
    systems = []
    if script_record.Script.DefaultLangSys:
        systems.append(script_record.Script.DefaultLangSys)
    systems.extend(record.LangSys for record in script_record.Script.LangSysRecord)
    indices = set()
    for langsys in systems:
        feature_indices = list(langsys.FeatureIndex)
        if langsys.ReqFeatureIndex != 0xFFFF:
            feature_indices.append(langsys.ReqFeatureIndex)
        for index in feature_indices:
            if feature_records[index].FeatureTag == feature_tag:
                indices.update(feature_records[index].Feature.LookupListIndex)
    for index in sorted(indices):
        lookup = lookup_list[index]
        for subtable in lookup.SubTable:
            lookup_type = lookup.LookupType
            if lookup_type == 9:
                lookup_type = subtable.ExtensionLookupType
                subtable = subtable.ExtSubTable
            yield lookup_type, subtable


def script_feature_tags(font: TTFont):
    gpos = font["GPOS"].table
    result = {}
    for script_record in gpos.ScriptList.ScriptRecord:
        systems = []
        if script_record.Script.DefaultLangSys:
            systems.append(script_record.Script.DefaultLangSys)
        systems.extend(record.LangSys for record in script_record.Script.LangSysRecord)
        tags = set()
        for langsys in systems:
            indices = list(langsys.FeatureIndex)
            if langsys.ReqFeatureIndex != 0xFFFF:
                indices.append(langsys.ReqFeatureIndex)
            tags.update(gpos.FeatureList.FeatureRecord[index].FeatureTag for index in indices)
        result[script_record.ScriptTag] = sorted(tags)
    return result

def mark_base_pairs(font: TTFont):
    pairs = set()
    for lookup_type, table in lookup_subtables(font, "mark"):
        if lookup_type != 4:
            continue
        marks = table.MarkCoverage.glyphs
        bases = table.BaseCoverage.glyphs
        for base_index, base_name in enumerate(bases):
            anchors = table.BaseArray.BaseRecord[base_index].BaseAnchor
            for mark_index, mark_name in enumerate(marks):
                mark_record = table.MarkArray.MarkRecord[mark_index]
                cls = mark_record.Class
                if (
                    cls < len(anchors)
                    and anchors[cls] is not None
                    and mark_record.MarkAnchor is not None
                ):
                    pairs.add((base_name, mark_name))
    return pairs


def mark_mark_pairs(font: TTFont):
    pairs = set()
    for lookup_type, table in lookup_subtables(font, "mkmk"):
        if lookup_type != 6:
            continue
        new_marks = table.Mark1Coverage.glyphs
        previous_marks = table.Mark2Coverage.glyphs
        for new_index, new_name in enumerate(new_marks):
            new_record = table.Mark1Array.MarkRecord[new_index]
            for previous_index, previous_name in enumerate(previous_marks):
                previous_anchors = table.Mark2Array.Mark2Record[previous_index].Mark2Anchor
                cls = new_record.Class
                if (
                    new_record.MarkAnchor is not None
                    and cls < len(previous_anchors)
                    and previous_anchors[cls] is not None
                ):
                    pairs.add((previous_name, new_name))
    return pairs


def mapped_graphemes(data, mark_codepoints):
    strings = []
    for section in ("phonemes", "allophoneMappings"):
        for record in data.get(section, []):
            for level in ("basic", "detailed", "extended"):
                value = record.get(level)
                if isinstance(value, str):
                    strings.append(value)

    clusters = set()
    for value in strings:
        base = None
        marks = []
        for char in unicodedata.normalize("NFD", value):
            if unicodedata.combining(char) and ord(char) in mark_codepoints:
                if base is not None:
                    marks.append(char)
            else:
                if base is not None and marks:
                    clusters.add((base, tuple(marks)))
                base, marks = char, []
        if base is not None and marks:
            clusters.add((base, tuple(marks)))
    return sorted(clusters, key=lambda item: (item[0], tuple(map(ord, item[1]))))


def main():
    data = json.loads(MAPPING.read_text(encoding="utf-8"))
    font = TTFont(FONT_PATH)
    cmap = font.getBestCmap()
    family = font["name"].getDebugName(1) or ""
    version = font["name"].getDebugName(5) or ""
    if family != "Charis" or "7.000" not in version:
        raise SystemExit(f"Expected Charis 7.000, got family={family!r}, version={version!r}")
    features = script_feature_tags(font)
    if not {"mark", "mkmk"}.issubset(features.get("cyrl", [])):
        raise SystemExit(f"Charis 7 lacks active Cyrillic mark/mkmk features: {features}")

    expected = {}
    for record in data["diacritics"]:
        codepoint = int(record["unicode"].split()[0].removeprefix("U+"), 16)
        expected[codepoint] = record["id"]

    missing = [f"U+{cp:04X} {name}" for cp, name in expected.items() if cp not in cmap]
    if missing:
        raise SystemExit("Missing UFPN inventory glyphs: " + ", ".join(missing))

    combining = {cp for cp in expected if unicodedata.combining(chr(cp))}
    glyph_for = {cp: cmap[cp] for cp in combining}
    base_pairs = mark_base_pairs(font)
    stacking_pairs = mark_mark_pairs(font)
    clusters = mapped_graphemes(data, combining)

    missing_base = []
    missing_stack = []
    for base, marks in clusters:
        base_glyph = cmap.get(ord(base))
        if base_glyph is None:
            missing_base.append(f"{base!r} U+{ord(base):04X}")
            continue
        for mark_index, mark in enumerate(marks):
            mark_glyph = glyph_for[ord(mark)]
            if (base_glyph, mark_glyph) not in base_pairs and mark_index == 0:
                missing_base.append(
                    f"{base} + U+{ord(mark):04X} ({base_glyph}/{mark_glyph})"
                )
            if mark_index:
                previous = marks[mark_index - 1]
                pair = (glyph_for[ord(previous)], mark_glyph)
                if pair not in stacking_pairs and (base_glyph, mark_glyph) not in base_pairs:
                    missing_stack.append(
                        f"U+{ord(previous):04X} + U+{ord(mark):04X}"
                    )

    if missing_base or missing_stack:
        if missing_base:
            print("Missing mark-to-base anchor pairs:", *sorted(set(missing_base)), sep="\n  ")
        if missing_stack:
            print("Missing mark-to-mark anchor pairs:", *sorted(set(missing_stack)), sep="\n  ")
        raise SystemExit(1)

    # HarfBuzz's Python wheel may not include WOFF2 decoding. Let fontTools
    # decode the verified WOFF2 first, then shape the equivalent sfnt bytes.
    sfnt_buffer = io.BytesIO()
    font.flavor = None
    font.save(sfnt_buffer)
    hb_face = hb.Face(sfnt_buffer.getvalue())
    hb_font = hb.Font(hb_face)
    hb.ot_font_set_funcs(hb_font)
    hb_font.scale = (font["head"].unitsPerEm, font["head"].unitsPerEm)
    mark_glyphs = set(glyph_for.values())
    shaped = 0
    for base, marks in clusters:
        sample = unicodedata.normalize("NFC", base + "".join(marks))
        buffer = hb.Buffer()
        buffer.add_str(sample)
        buffer.guess_segment_properties()
        buffer.script = "Cyrl"
        buffer.language = "uk"
        hb.shape(hb_font, buffer, {"mark": 1, "mkmk": 1})
        if any(info.codepoint == 0 for info in buffer.glyph_infos):
            nominal = [
                (f"U+{ord(char):04X}", cmap.get(ord(char)), hb_font.get_nominal_glyph(ord(char)))
                for char in sample
            ]
            raise SystemExit(
                f"HarfBuzz produced .notdef for {sample!r}; "
                f"face_upem={hb_face.upem}, font_glyphs={hb_face.glyph_count}, "
                f"nominal={nominal}, shaped={[info.codepoint for info in buffer.glyph_infos]}"
            )
        shaped_marks = []
        for info, position in zip(buffer.glyph_infos, buffer.glyph_positions):
            glyph_name = font.getGlyphName(info.codepoint)
            if glyph_name in mark_glyphs:
                if position.x_advance or position.y_advance:
                    raise SystemExit(
                        f"Combining mark has non-zero advance in {sample!r}: {glyph_name}"
                    )
                shaped_marks.append((glyph_name, position.y_offset))
        if len(shaped_marks) != len(marks):
            raise SystemExit(
                f"Expected {len(marks)} combining marks in {sample!r}, "
                f"HarfBuzz returned {len(shaped_marks)}"
            )
        shaped += 1

    print(
        f"PASS: Charis 7.000 ({version}); all {len(expected)} UFPN inventory "
        f"codepoints covered; {len(combining)} combining marks; "
        f"{len(clusters)} mapped base/mark clusters checked; "
        f"{shaped} HarfBuzz shaping samples passed; "
        f"{len(base_pairs)} mark-to-base anchor pairs and "
        f"{len(stacking_pairs)} Cyrillic mark-to-mark anchor pairs inspected; "
        f"active Cyrillic features={features.get('cyrl')}."
    )


if __name__ == "__main__":
    main()
