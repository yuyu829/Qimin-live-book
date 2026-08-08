import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("reading recommendations stay inside one app viewport", () => {
  assert.match(css, /\.recommend-page\{height:calc\(100svh - 68px\);min-height:0;overflow:hidden/);
  assert.match(css, /\.recommend-page \.chapter-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:10px\}/);
  assert.match(css, /\.recommend-page \.tile-art\{height:160px\}/);
  assert.match(css, /\.recommend-page \.tile-body\{padding:16px\}/);
  assert.match(page, /className="reading-art-placeholder" aria-label="读书页插画占位"/);
  assert.match(css, /\.recommend-heading\{margin-bottom:20px\}/);
  assert.match(css, /\.reading-art-placeholder\{height:256px\}/);
});

test("map artwork fills the viewport without legacy place overlays", () => {
  assert.match(css, /\.map-page\{[^}]*height:calc\(100svh - 68px\)[^}]*overflow:hidden/);
  assert.match(css, /\.map-page \.world-map\{position:absolute;inset:0;width:100%;height:100%/);
  assert.match(page, /data-map-coordinate-space="853x1844"/);
  assert.doesNotMatch(page, /place-farm|place-brew|place-school|locked-place|map-river/);
});

test("map hotspots use the original artwork coordinate system", () => {
  assert.match(page, /viewBox="0 0 853 1844" preserveAspectRatio="xMidYMid slice"/);
  assert.match(page, /x="306" y="304" width="242" height="242"[^>]*onClick=\{\(\) => setVolume\("soybean"\)\}/);
  assert.match(page, /x="20" y="868" width="242" height="242"[^>]*onClick=\{\(\) => setVolume\("sauce"\)\}/);
  assert.match(css, /\.map-hotspots\{position:absolute;inset:0;z-index:3;width:100%;height:100%\}/);
});

test("map hotspots open volume chapter pickers", () => {
  assert.match(page, /const mapVolumes = \{/);
  assert.match(page, /className="map-volume-popover"/);
  assert.match(page, /mapVolumes\[volume\]\.items\.map/);
  assert.match(css, /\.map-volume-backdrop\{position:absolute;inset:0/);
  assert.match(css, /\.map-volume-list\{display:flex;flex-wrap:wrap/);
});

test("map navigation is transparent and simplified", () => {
  assert.match(page, /screen === "map" \? "map-screen"/);
  assert.match(css, /\.map-screen \.topbar\{background:transparent;border-bottom-color:transparent/);
  assert.match(css, /\.map-screen \.topbar \.cat-mark-small,\.map-screen \.topbar \.progress-pill\{display:none\}/);
  assert.match(css, /\.map-screen \.topbar \.brand b\{font-size:21px\}/);
});
