import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("chapter intro is fixed directly below the chapter navigation in both reader modes", () => {
  assert.match(css, /\.chapter-intro\{position:fixed;top:58px;left:50%;transform:translateX\(-50%\);z-index:35;width:min\(100%,430px\);height:155px;min-height:155px/);
  assert.match(css, /\.chapter-intro\{[^}]*border-bottom:0/);
  assert.match(css, /\.reader-page\{padding-top:0\}/);
  assert.match(page, /reader-page \$\{readerMode === "full" \? "is-full-reader"/);
});

test("reader shortcuts sit in a fixed row directly below the chapter intro", () => {
  assert.match(css, /\.reader-shortcuts\{position:fixed;top:213px;left:50%;right:auto;transform:translateX\(-50%\)/);
  assert.match(css, /\.reader-shortcuts\{[^}]*height:54px/);
  assert.match(css, /\.reader-shortcuts\{[^}]*padding:1px 14px/);
  assert.match(css, /\.reader-shortcuts\{[^}]*border-bottom:0/);
  assert.match(css, /\.chapter-intro:after\{content:"";position:absolute;left:22px;right:22px;bottom:16px;border-top:1px dashed rgba\(205,189,167,\.32\);pointer-events:none\}/);
  assert.doesNotMatch(css, /\.reader-shortcuts:(?:before|after)\{[^}]*border-top:[^}]*dashed/);
  assert.match(page, /<\/section>\s*\{readerMode === "deck" && <div className="reader-shortcuts"/);
  assert.match(page, />阅读全文<\/button>/);
  assert.match(page, /"去种芋" : "去作酱"/);
});

test("full text starts closer to the intro without moving the deck", () => {
  assert.match(css, /\.reader-page>\.chat-stream\{padding-top:267px\}/);
  assert.match(css, /\.reader-page\.is-full-reader \.chat-stream\{padding-top:203px\}/);
  assert.match(css, /\.reader-page \.deck-stage\{padding-top:72px\}/);
});
