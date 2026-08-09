import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("chapter intro is the first fixed layer at the top of both reader modes", () => {
  assert.match(css, /\.chapter-intro\{position:fixed;top:0;left:50%;transform:translateX\(-50%\);z-index:35;width:min\(100%,430px\);height:170px;min-height:170px/);
  assert.match(css, /\.reader-page\{padding-top:0\}/);
  assert.match(page, /reader-page \$\{readerMode === "full" \? "is-full-reader"/);
});

test("reader shortcuts sit in a fixed row directly below the chapter intro", () => {
  assert.match(css, /\.reader-shortcuts\{position:fixed;top:170px;left:50%;right:auto;transform:translateX\(-50%\)/);
  assert.match(css, /\.reader-shortcuts\{[^}]*height:54px/);
  assert.match(page, /<\/section>\s*\{readerMode === "deck" && <div className="reader-shortcuts"/);
  assert.match(page, />阅读全文<\/button>/);
  assert.match(page, /"去种芋" : "去晒酱"/);
});

test("deck and full-text content reserve the same stable top area", () => {
  assert.match(css, /\.reader-page>\.chat-stream\{padding-top:224px\}/);
  assert.match(css, /\.reader-page\.is-full-reader \.chat-stream\{padding-top:224px\}/);
  assert.match(css, /\.reader-page \.deck-stage\{padding-top:72px\}/);
});
