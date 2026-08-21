import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("floating tools retain distinct active and inactive visual states", () => {
  assert.match(css, /\.message-row:not\(\.active-message\) \.context-rail/);
  assert.match(css, /\.active-message \.context-rail/);
  assert.match(css, /animation:railFocusIn/);
});

test("term explanation card is readable rather than overly transparent", () => {
  assert.match(css, /background:rgba\(63,58,49,\.84\)!important/);
});

test("context rail has no more-options dot marker", () => {
  assert.doesNotMatch(page, /className="rail-dots"/);
});

test("keyword rail scrolls with card text on short viewports", () => {
  assert.match(page, /className="message-scroll"/);
  assert.match(page, /className="message-scroll"[\s\S]*className="context-rail"/);
  assert.match(css, /\.deck-card \.message-scroll\{[^}]*overflow-y:auto/);
  assert.match(css, /\.deck-card \.message-scroll\{[^}]*padding-right:62px/);
  assert.match(css, /\.message-scroll \.context-rail\{top:8px;right:2px\}/);
  assert.match(css, /\.context-rail \.term-popover\{right:8px;width:196px\}/);
  assert.match(css, /\.message-scroll:has\(\.context-rail\) \.paper-bubble\{min-height:max\(calc\(100% - 4px\),150px\)\}/);
});

test("full reader keeps keyword tools in the right gutter", () => {
  assert.match(css, /\.is-full-reader \.message-scroll\{padding-right:76px\}/);
  assert.match(css, /\.is-full-reader \.message-scroll \.context-rail\{right:0\}/);
  assert.match(css, /\.is-full-reader \.context-rail \.term-popover\{right:0;left:auto;width:148px\}/);
});
