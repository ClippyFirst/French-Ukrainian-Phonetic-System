// Keep each IPA-derived UFPN string in one text run so the browser's
// OpenType shaper can apply the font's mark-to-base (mark) and
// mark-to-mark (mkmk) GPOS anchors. Do not replace combining marks with
// spacing modifier glyphs or position them with CSS.
export function renderUfpnDisplay(container, value) {
  container.textContent = String(value ?? '').normalize('NFC');
}
