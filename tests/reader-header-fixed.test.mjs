import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("chapter header is fixed to the phone viewport", () => {
  assert.match(css, /\.reader-header\{position:fixed;top:0;left:50%;transform:translateX\(-50%\);width:min\(100%,430px\);height:72px;z-index:40\}/);
});

test("reader content reserves space for the fixed header", () => {
  assert.match(css, /\.reader-page\{[^}]*padding-top:72px/);
});
