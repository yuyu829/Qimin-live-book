import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("compact chapter reading locks the vertical viewport", () => {
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\)\{height:100svh;min-height:100svh;overflow:hidden;overscroll-behavior:none\}/);
  assert.match(css, />\.chat-stream\{position:fixed;top:267px;bottom:78px/);
});

test("sauce copies the taro deck height without changing taro measurement", () => {
  assert.match(page, /chapters\.map/);
  assert.match(page, /const taroReferenceCardRef = useRef<HTMLDivElement>\(null\)/);
  assert.match(page, /chapter\.id === "sauce" \? taroReferenceCardRef\.current : firstCardRef\.current/);
  assert.match(page, /const naturalHeight = card\.scrollHeight/);
  assert.match(page, /const availableHeight = window\.innerHeight - 282 - 78 - DECK_STACK_RISE/);
  assert.match(page, /Math\.max\(120, Math\.min\(345, naturalHeight \+ 68, availableHeight\)\)/);
  assert.match(page, /height: deckCardHeight \? `\$\{deckCardHeight\}px` : undefined/);
  assert.match(page, /chapter\.id === "sauce"[\s\S]*className="deck-card deck-height-reference"[\s\S]*chapter=\{chapters\[0\]\}[\s\S]*message=\{chapters\[0\]\.messages\[0\]\}/);
  assert.match(css, /\.deck-height-reference\{[^}]*left:-10000px!important[^}]*visibility:hidden!important/);
  assert.doesNotMatch(css, /\.deck-card\{height:360px/);
});

test("compact cards ellipsize both translation and original while full reader stays complete", () => {
  assert.match(page, /isTranslationTruncated = compact && message\.translation\.length > 40/);
  assert.match(page, /isOriginalTruncated = compact && message\.original\.length > 48/);
  assert.match(page, /message\.translation\.slice\(0, 40\)\}\.{3}/);
  assert.match(page, /<p className="translation">\{displayTranslation\}<\/p>/);
  assert.match(page, /className="compact-read-more-row">[\s\S]*className="compact-read-more"[\s\S]*>阅读全文<\/button><\/div>/);
  assert.match(css, /\.deck-card \.translation\{[^}]*-webkit-line-clamp:3/);
  assert.match(css, /\.deck-card \.original-block\{position:relative;padding-bottom:22px\}/);
  assert.match(css, /\.deck-card \.original-block>p\{[^}]*-webkit-line-clamp:3/);
  assert.match(css, /\.compact-read-more-row\{display:flex;justify-content:flex-end;flex:none;min-height:22px;margin-top:6px/);
  assert.match(css, /\.compact-read-more-row \.compact-read-more\{[^}]*position:static[^}]*color:#c53f32/);
  assert.match(css, /\.message-heading\{display:flex;align-items:flex-start;justify-content:space-between/);
  assert.match(css, /\.message-heading>\.why-button\{[^}]*margin:3px 0 0[^}]*background:#e7ebdd[^}]*color:var\(--sage-dark\)/);
  assert.match(page, /<div className="message-heading">[\s\S]*<button className="speaker-name"[\s\S]*<button className="why-button"[\s\S]*<\/div>[\s\S]*<article className=/);
  assert.match(css, /\.why-button,\.why-button svg\{[^}]*color:var\(--sage-dark\)/);
  assert.match(page, /readerMode === "full"[\s\S]*chapter\.messages\.map/);
});

test("full text action keeps the complete scrolling reader available", () => {
  assert.match(page, /onClick=\{\(\) => setReaderMode\("full"\)\}>阅读全文/);
  assert.match(css, /\.reader-page\.is-full-reader\{height:100svh;min-height:0;overflow-x:hidden;overflow-y:scroll/);
});
