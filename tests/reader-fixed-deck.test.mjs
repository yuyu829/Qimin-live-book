import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("deck reader is locked to one viewport without vertical scrolling", () => {
  assert.match(css, /\.reader-page\{[^}]*height:100svh[^}]*overflow:hidden/);
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\)>\.chat-stream\{position:fixed;top:282px;bottom:78px/);
});

test("five-card stack begins exactly at the shortcut row lower edge", () => {
  assert.match(css, /\.reader-shortcuts\{position:fixed;top:228px[^}]*height:54px/);
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\)>\.chat-stream\{position:fixed;top:282px/);
  assert.match(page, /style=\{\{ paddingTop: `\$\{DECK_STACK_RISE\}px` \}\}/);
  assert.match(page, /DECK_STACK_RISE, deckCardTransform/);
  assert.match(page, /slice\(currentIndex, currentIndex \+ 5\)/);
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\) \.deck-stage\{[^}]*transform:translateY\(-40px\)/);
  assert.match(css, /\.swipe-hint\{[^}]*bottom:24px/);
});

test("compact cards truncate both translation and original while detail keeps full text", () => {
  assert.match(page, /message\.translation\.length > 40/);
  assert.match(page, /message\.original\.length > 48/);
  assert.match(css, /\.deck-card \.translation\{[^}]*-webkit-line-clamp:3/);
  assert.match(css, /\.deck-card \.original-block>p\{[^}]*-webkit-line-clamp:3/);
  assert.match(page, /<blockquote>\{message\.original\}<\/blockquote>/);
});
