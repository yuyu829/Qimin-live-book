import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("school notes scroll inside the viewport with a visible position bar", () => {
  assert.match(css, /\.school-page\{height:calc\(100svh - 68px\);overflow-x:hidden;overflow-y:scroll;padding-top:12px;padding-bottom:92px;scrollbar-width:thin/);
  assert.match(css, /\.school-page::-webkit-scrollbar\{width:6px\}/);
  assert.match(css, /\.school-page::-webkit-scrollbar-thumb\{border-radius:6px;background:#aa8c70\}/);
});
