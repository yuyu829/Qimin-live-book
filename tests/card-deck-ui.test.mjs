import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("top deck card binds pointer gestures", () => {
  assert.match(page, /onPointerDown=\{isTop \? handlePointerDown : undefined\}/);
  assert.match(page, /onPointerMove=\{isTop \? handlePointerMove : undefined\}/);
  assert.match(page, /onPointerUp=\{isTop \? handlePointerUp : undefined\}/);
});

test("deck includes depth transitions and swipe exit animation", () => {
  assert.match(css, /\.deck-card\{[^}]*transition:transform \.38s/);
  assert.match(css, /\.deck-card\.is-dismissing/);
  assert.match(css, /perspective:1000px/);
});

test("deck card height follows its content", () => {
  assert.match(css, /\.deck-stage\{[^}]*display:grid/);
  assert.match(css, /\.deck-card\{[^}]*grid-area:1\/1[^}]*min-height:0[^}]*max-height:none/);
  assert.doesNotMatch(css, /\.deck-card\{[^}]*min-height:430px/);
  assert.doesNotMatch(css, /\.deck-stage\{[^}]*min-height:590px/);
});

test("rear cards have visible room above the lowered front card", () => {
  assert.match(css, /\.deck-stage\{[^}]*padding-top:220px/);
});

test("deck still keeps five message slots after removing the scene marker", () => {
  assert.doesNotMatch(page, /deck-date/);
  assert.match(page, /slice\(currentIndex, currentIndex \+ 5\)/);
});

test("swipe hint has its own space below cards and stays within a fixed reader viewport", () => {
  assert.match(css, /\.reader-page\{[^}]*height:100svh[^}]*overflow:hidden/);
  assert.match(css, /\.chat-stream\{position:relative;overflow:visible;height:auto\}/);
  assert.match(css, /\.deck-stage\{[^}]*padding-bottom:46px/);
  assert.match(css, /\.deck-stage\{[^}]*transform:translateY\(-16px\)/);
  assert.match(css, /\.swipe-hint\{[^}]*bottom:10px[^}]*white-space:nowrap/);
  assert.doesNotMatch(css, /\.swipe-hint\{[^}]*border-radius/);
});

test("annotated original terms have a highlighted text style", () => {
  assert.match(css, /\.original-term\{[^}]*font-weight:800/);
});

test("chapter shortcuts appear above the deck with a themed action and cat placeholder", () => {
  assert.match(page, /className="reader-shortcuts"/);
  assert.match(page, />阅读全文</);
  assert.match(page, /chapter\.id === "soybean" \? "去种豆" : "去晒酱"/);
  assert.match(page, /className="shortcut-cat-placeholder"/);
  assert.match(css, /\.reader-shortcuts\{position:absolute;top:3px;right:14px/);
  assert.match(css, /\.reader-shortcuts>button\{[^}]*padding:7px 10px[^}]*border-radius:7px[^}]*font-size:12px/);
  assert.match(css, /\.shortcut-cat-placeholder\{[^}]*width:46px;height:42px/);
  assert.match(css, /@keyframes shortcutCatBob/);
});

test("full text shortcut opens the original vertical chat reader", () => {
  assert.match(page, /useState<"deck" \| "full">\("deck"\)/);
  assert.match(page, /onClick=\{\(\) => setReaderMode\("full"\)\}>阅读全文/);
  assert.match(page, /className="full-chat-stream" aria-label="章节全文聊天室"/);
  assert.match(page, /chapter\.messages\.map\(\(message\) =>/);
  assert.match(page, /readerMode === "full" \? \(\) => setReaderMode\("deck"\) : onBack/);
  assert.match(css, /\.reader-page\.is-full-reader\{height:auto;min-height:100svh;overflow:visible\}/);
});
