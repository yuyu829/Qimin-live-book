import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("reading recommendations stay inside one app viewport", () => {
  assert.match(css, /\.recommend-page\{height:calc\(100svh - 68px\);min-height:0;overflow:hidden/);
  assert.match(css, /\.recommend-page \.chapter-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test("map artwork fills the viewport without legacy place overlays", () => {
  assert.match(css, /\.map-page\{[^}]*height:calc\(100svh - 68px\)[^}]*overflow:hidden/);
  assert.match(css, /\.map-page \.world-map\{position:absolute;inset:0;width:100%;height:100%/);
  assert.match(page, /data-map-coordinate-space="percentage"/);
  assert.doesNotMatch(page, /place-farm|place-brew|place-school|locked-place|map-river/);
});
