import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("school experience notes stay in two columns", () => {
  assert.match(page, /<div className="note-wall">\{notes\.map/);
  assert.match(css, /\.school-page \.note-wall\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/);
});
