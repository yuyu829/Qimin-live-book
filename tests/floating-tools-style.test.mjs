import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("floating tools retain distinct active and inactive visual states", () => {
  assert.match(css, /\.message-row:not\(\.active-message\) \.context-rail/);
  assert.match(css, /\.active-message \.context-rail/);
  assert.match(css, /animation:railFocusIn/);
});

test("term explanation card is readable rather than overly transparent", () => {
  assert.match(css, /background:rgba\(63,58,49,\.84\)!important/);
});
