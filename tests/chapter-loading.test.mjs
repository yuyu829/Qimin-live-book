import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("book recommendations open a timed chapter loading screen", () => {
  assert.match(page, /type Screen = [^;]*"chapter-loading"/);
  assert.match(page, /function loadChapter\(id: Chapter\["id"\]\) \{ setChapterId\(id\); setScreen\("chapter-loading"\)/);
  assert.match(page, /screen === "recommend" && <Recommendations onOpen=\{loadChapter\}/);
  assert.match(page, /screen === "chapter-loading" && <ChapterLoading chapter=\{chapter\}/);
  assert.match(page, /window\.setTimeout\(\(\) => \{ setScreen\("reader"\); window\.scrollTo\(0, 0\); \}, 2300\)/);
  assert.match(page, /window\.clearTimeout\(timer\)/);
});

test("each chapter loading screen has a title, matching cat, and introduction", () => {
  assert.match(page, /<h1>\{chapter\.title\}<\/h1>/);
  assert.match(page, /chapter\.id === "soybean" \? "\/art\/taro-cat\.gif" : "\/art\/sauce-cat\.gif"/);
  assert.match(page, /乾隆南巡/);
  assert.match(page, /选豆、蒸豆、拌曲到百日晒制/);
  assert.match(css, /\.chapter-loading-page\{min-height:100svh;display:grid;place-items:center/);
  assert.match(css, /\.chapter-loading-content\{[^}]*justify-items:center[^}]*text-align:center/);
  assert.match(css, /\.chapter-loading-content\{[^}]*animation:chapterLoadingBridge 2\.3s ease both/);
  assert.match(css, /@keyframes chapterLoadingBridge\{0%,78%\{opacity:1;transform:translateY\(0\) scale\(1\)\}100%\{opacity:0;transform:translateY\(-18px\) scale\(\.985\)\}\}/);
  assert.match(css, /\.reader-page\{animation:readerBridgeIn \.42s/);
  assert.match(css, /@keyframes readerBridgeIn\{from\{opacity:0;transform:translateY\(14px\)\}to\{opacity:1;transform:translateY\(0\)\}\}/);
});
