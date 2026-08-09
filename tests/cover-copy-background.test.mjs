import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("cover text column stays transparent", () => {
  assert.match(css, /\.cover-copy\{position:relative;z-index:10;[^}]*background:transparent\}/);
});
