import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("cover artwork is a fixed background layer behind spacious foreground copy", () => {
  assert.match(css, /\.cover-screen\{position:relative;[^}]*min-height:100svh;display:block/);
  assert.match(css, /\.cover-copy\{position:relative;z-index:10;min-height:100svh;[^}]*padding:clamp\(68px,11svh,104px\) 24px 72px/);
  assert.match(css, /\.cover-copy h1\{[^}]*margin:34px 0 0/);
  assert.match(css, /\.cover-kicker\{[^}]*line-height:1\.9;margin:32px 0 0/);
  assert.match(css, /\.cover-copy \.primary-button\{[^}]*margin-top:clamp\(44px,7svh,68px\);transform:translateY\(-20px\)/);
  assert.match(css, /\.farm-scene\{position:absolute;inset:0;z-index:0;[^}]*height:100%/);
});
