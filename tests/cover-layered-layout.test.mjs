import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("cover artwork is a fixed background layer behind spacious foreground copy", () => {
  assert.match(css, /\.cover-screen\{position:relative;[^}]*min-height:100svh;display:block/);
  assert.match(css, /\.cover-copy\{position:relative;z-index:10;min-height:100svh;[^}]*padding:clamp\(62px,10svh,92px\) 24px clamp\(86px,13svh,126px\)/);
  assert.match(css, /\.cover-copy h1\{[^}]*margin:28px 0 0/);
  assert.match(css, /\.cover-kicker\{[^}]*line-height:1\.85;margin:28px 0 0/);
  assert.match(css, /\.cover-copy \.primary-button\{[^}]*margin-top:auto\}/);
  assert.match(css, /\.farm-scene\{position:absolute;inset:0;z-index:0;[^}]*height:100%/);
});
