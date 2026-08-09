import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("deck and full-text readers share a visible back arrow", () => {
  assert.match(page, /className="reader-back-button"/);
  assert.match(page, /<ArrowLeft size=\{18\} \/>/);
  assert.match(page, /aria-label=\{readerMode === "full" \? "返回卡片阅读" : "返回章节列表"\}/);
});

test("back arrow returns full text to deck and deck to chapter list", () => {
  assert.match(page, /onClick=\{readerMode === "full" \? \(\) => setReaderMode\("deck"\) : onBack\}/);
});

test("back arrow is a simple circular control inside the chapter navigation", () => {
  assert.match(page, /<header className="reader-chapter-nav">[\s\S]*className="reader-back-button"/);
  assert.match(css, /\.reader-back-button\{width:36px;height:36px/);
  assert.match(css, /\.reader-back-button\{[^}]*border-radius:50%/);
});
