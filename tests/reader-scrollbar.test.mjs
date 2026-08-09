import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("full reading has a visible vertical position scrollbar", () => {
  assert.match(css, /\.reader-page\.is-full-reader\{height:100svh;min-height:0;overflow-x:hidden;overflow-y:scroll;scrollbar-width:thin;scrollbar-color:#aa8c70 rgba\(221,210,192,\.5\)\}/);
  assert.match(css, /\.reader-page\.is-full-reader::-webkit-scrollbar\{width:6px\}/);
  assert.match(css, /\.reader-page\.is-full-reader::-webkit-scrollbar-thumb\{border-radius:6px;background:#aa8c70\}/);
});
