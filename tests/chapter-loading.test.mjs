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
  assert.match(page, /window\.setTimeout\(\(\) => \{ setScreen\("reader"\); window\.scrollTo\(0, 0\); \}, 1800\)/);
  assert.match(page, /window\.clearTimeout\(timer\)/);
});

test("each chapter loading screen has a title, matching cat, and introduction", () => {
  assert.match(page, /<h1>\{chapter\.title\}<\/h1>/);
  assert.match(page, /chapter\.id === "soybean" \? "\/art\/taro-cat\.gif" : "\/art\/sauce-cat\.gif"/);
  assert.match(page, /乾隆南巡/);
  assert.match(page, /选豆、蒸豆、拌曲到百日晒制/);
  assert.match(css, /\.chapter-loading-page\{min-height:100svh;display:grid;place-items:center/);
  assert.match(css, /\.chapter-loading-content\{[^}]*justify-items:center[^}]*text-align:center/);
});
