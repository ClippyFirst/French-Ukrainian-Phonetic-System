import { chromium, firefox, webkit } from "playwright";
import { mkdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const mapping = JSON.parse(await readFile(new URL("../data/ufpn-mapping.json", import.meta.url), "utf8"));
const markCodepoints = new Set(
  mapping.diacritics
    .map((item) => Number.parseInt(item.unicode.match(/^U\+([0-9A-F]+)/i)?.[1] ?? "", 16))
    .filter(Number.isFinite)
);

function collectClusters(value) {
  const clusters = [];
  let base = "";
  let marks = "";
  for (const char of value.normalize("NFD")) {
    if (/\p{M}/u.test(char) && markCodepoints.has(char.codePointAt(0))) {
      if (base) marks += char;
    } else {
      if (base && marks) clusters.push(base + marks);
      base = char;
      marks = "";
    }
  }
  if (base && marks) clusters.push(base + marks);
  return clusters;
}

const outputs = [];
for (const section of ["phonemes", "allophoneMappings"]) {
  for (const record of mapping[section] ?? []) {
    for (const level of ["basic", "detailed", "extended"]) {
      if (typeof record[level] === "string") outputs.push(record[level]);
    }
  }
}
const adoptedGraphemes = mapping.graphemeInventory.adopted.map((item) => item.grapheme);
const samples = [...new Set([...outputs.flatMap(collectClusters), ...adoptedGraphemes])].sort();

if (!adoptedGraphemes.every((value) => samples.includes(value))) {
  throw new Error("Browser specimen is missing an adopted extended-Cyrillic grapheme");
}

await mkdir(new URL("../artifacts/", import.meta.url), { recursive: true });
const browserTypes = [
  ["chromium", chromium],
  ["firefox", firefox],
  ["webkit", webkit]
];
const results = [];
for (const [name, browserType] of browserTypes) {
  const browser = await browserType.launch({ headless: true });
  try {
    for (const viewport of [
      { label: "desktop", width: 1440, height: 1100 },
      { label: "mobile", width: 390, height: 844 }
    ]) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
      await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "networkidle" });
      const result = await page.evaluate(async (values) => {
        const style = document.createElement("style");
        style.textContent = `
          #charis-audit { margin: 24px; padding: 24px; background: #fffefa; color: #202b28; }
          #charis-audit h1 { font: 700 24px Arial, sans-serif; margin: 0 0 8px; }
          #charis-audit p { font: 13px Arial, sans-serif; margin: 0 0 20px; }
          #charis-audit .samples { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
          #charis-audit .sample { border: 1px solid #d9d9cf; padding: 12px; min-height: 105px; }
          #charis-audit .glyph { display: block; font: 400 42px/2.2 "Charis", serif; font-feature-settings: "mark" 1, "mkmk" 1; }
          #charis-audit .code { display: block; font: 11px/1.5 monospace; color: #737c75; overflow-wrap: anywhere; }
        `;
        document.head.append(style);
        const panel = document.createElement("section");
        panel.id = "charis-audit";
        panel.innerHTML = "<h1>Charis 7.000 · UFPN Cyrillic and combining-mark specimen</h1><p>All adopted Cyrillic letters and mapped base/diacritic clusters, rendered through the repository's local @font-face and browser shaping engine.</p><div class='samples'></div>";
        document.body.prepend(panel);
        const grid = panel.querySelector(".samples");
        for (const value of values) {
          const card = document.createElement("div");
          card.className = "sample";
          const glyph = document.createElement("span");
          glyph.className = "glyph";
          glyph.textContent = value;
          const code = document.createElement("span");
          code.className = "code";
          code.textContent = [...value].map((char) => "U+" + char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ");
          card.append(glyph, code);
          grid.append(card);
        }
        await Promise.all(values.map((value) => document.fonts.load('42px "Charis"', value)));
        await document.fonts.ready;
        const fontFaces = [...document.fonts].map((face) => ({ family: face.family, status: face.status, weight: face.weight }));
        const resources = performance.getEntriesByType("resource")
          .filter((entry) => entry.name.includes("Charis-"))
          .map((entry) => ({ name: entry.name.split("/").pop(), transferSize: entry.transferSize }));
        return {
          fontCheck: document.fonts.check('42px "Charis"', values.join("")),
          computedFamily: getComputedStyle(grid.querySelector(".glyph")).fontFamily,
          sampleCount: grid.children.length,
          fontFaces,
          resources,
          viewport: { width: innerWidth, height: innerHeight },
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      }, samples);
      if (!result.fontCheck) throw new Error(`${name}/${viewport.label}: Charis FontFaceSet check failed`);
      if (!result.computedFamily.includes("Charis")) throw new Error(`${name}/${viewport.label}: wrong computed family`);
      if (result.sampleCount !== samples.length) throw new Error(`${name}/${viewport.label}: missing mapped clusters`);
      if (!result.resources.some((entry) => entry.name === "Charis-Regular.woff2")) {
        throw new Error(`${name}/${viewport.label}: local Charis WOFF2 not requested`);
      }
      if (viewport.label === "mobile" && result.horizontalOverflow) {
        throw new Error(`${name}: mobile specimen causes horizontal page overflow`);
      }
      let screenshot = null;
      if (name === "chromium" && viewport.label === "desktop") {
        screenshot = fileURLToPath(new URL("../artifacts/charis-7.000-ufpn.png", import.meta.url));
        await page.screenshot({ path: screenshot, fullPage: true });
      }
      results.push({ browser: name, viewport: viewport.label, ...result, screenshot });
      await page.close();
    }
  } finally {
    await browser.close();
  }
}
const screenshotPath = fileURLToPath(new URL("../artifacts/charis-7.000-ufpn.png", import.meta.url));
const screenshotBytes = (await stat(screenshotPath)).size;
console.log(JSON.stringify({ browsers: results, screenshot: "artifacts/charis-7.000-ufpn.png", screenshotBytes, specimens: samples }, null, 2));
