import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("collection and chapter game entries use a subtle fill pulse without changing layout", () => {
  assert.match(page, /className="game-shortcut-button"[\s\S]*"去种芋" : "去作酱"/);
  assert.match(page, /className="map-pouch-button" type="button" aria-label="打开图鉴"/);
  assert.match(css, /\.game-shortcut-button,\.map-pouch-button\{animation:entryColorPulse 2\.8s ease-in-out infinite\}/);
  assert.match(css, /@keyframes entryColorPulse\{0%,100%\{background-color:rgba\(255,248,235,\.92\)\}50%\{background-color:rgba\(246,218,180,\.96\)\}\}/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\*\{[^}]*animation-duration:\.01ms!important;animation-iteration-count:1!important/);
});
