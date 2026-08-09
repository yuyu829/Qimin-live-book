import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("compact chapter reading locks the vertical viewport", () => {
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\)\{height:100svh;min-height:100svh;overflow:hidden;overscroll-behavior:none\}/);
  assert.match(css, />\.chat-stream\{position:fixed;top:282px;bottom:78px/);
});

test("all soybean and sauce deck cards share the same fixed dimensions", () => {
  assert.match(page, /chapters\.map/);
  assert.match(page, /const naturalHeight = card\.scrollHeight/);
  assert.match(page, /const availableHeight = window\.innerHeight - 282 - 78 - DECK_STACK_RISE/);
  assert.match(page, /height: deckCardHeight \? `\$\{deckCardHeight\}px` : undefined/);
  assert.doesNotMatch(css, /\.deck-card\{height:360px/);
});

test("compact cards ellipsize both translation and original while full reader stays complete", () => {
  assert.match(page, /displayTranslation = compact && message\.translation\.length > 84/);
  assert.match(page, /isOriginalTruncated = compact && message\.original\.length > 120/);
  assert.match(page, /message\.translation\.slice\(0, 84\)\}\.{3}/);
  assert.match(page, /<p className="translation">\{displayTranslation\}<\/p>/);
  assert.match(page, /className="compact-read-more"[\s\S]*>\.\.\.阅读全文<\/button>/);
  assert.match(css, /\.deck-card \.translation\{[^}]*-webkit-line-clamp:4/);
  assert.match(css, /\.deck-card \.original-block>p\{[^}]*-webkit-line-clamp:5/);
  assert.match(css, /\.compact-read-more\{[^}]*color:var\(--clay-dark\)/);
  assert.match(page, /readerMode === "full"[\s\S]*chapter\.messages\.map/);
});

test("full text action keeps the complete scrolling reader available", () => {
  assert.match(page, /onClick=\{\(\) => setReaderMode\("full"\)\}>阅读全文/);
  assert.match(css, /\.reader-page\.is-full-reader\{height:auto;min-height:100svh;overflow:visible\}/);
});
