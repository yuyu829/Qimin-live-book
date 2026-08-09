import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("school replaces the text back link with a chapter-style navigation row", () => {
  assert.match(page, /<header className="school-return-nav">[\s\S]*className="school-back-button"[\s\S]*aria-label="回齐民村"[\s\S]*<h1>学堂<\/h1>/);
  assert.doesNotMatch(page, /className="back-link"/);
});

test("school return control uses the same circular proportions and centered title layout", () => {
  assert.match(css, /\.school-return-nav\{height:58px;display:grid;grid-template-columns:48px 1fr 48px/);
  assert.match(css, /\.school-return-nav h1\{[^}]*text-align:center/);
  assert.match(css, /\.school-back-button\{width:36px;height:36px[^}]*border-radius:50%/);
});
