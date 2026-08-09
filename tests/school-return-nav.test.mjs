import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("school uses a compact return link without a separate navigation bar", () => {
  assert.match(page, /<button className="school-return-link"[^>]*aria-label="回齐民村">[\s\S]*className="school-return-icon"[\s\S]*<span>回齐民村<\/span>/);
  assert.doesNotMatch(page, /className="school-return-nav"/);
});

test("school return text follows the chapter-style circular arrow", () => {
  assert.match(css, /\.school-return-link\{display:inline-flex;align-items:center;gap:8px/);
  assert.match(css, /\.school-return-icon\{width:36px;height:36px[^}]*border-radius:50%/);
});

test("school return area sits closer to the app title", () => {
  assert.match(css, /\.school-page\{padding-top:12px\}/);
  assert.match(css, /\.school-page \.school-heading\{margin-top:14px\}/);
});
