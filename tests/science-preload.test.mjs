import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("the visible deck card preloads its science explanation", () => {
  assert.match(page, /if \(readerMode !== "deck"\) return;/);
  assert.match(page, /const message = chapter\.messages\[currentIndex\];/);
  assert.match(page, /if \(message\) void loadScienceExplanation\(\{ action: "science", chapterId: chapter\.id, messageId: message\.id \}\);/);
});

test("detail reading reuses the in-flight or completed science request", () => {
  assert.match(page, /const scienceResponseCache = new Map<string, Promise<AiResponse>>\(\);/);
  assert.match(page, /const cached = scienceResponseCache\.get\(cacheKey\);/);
  assert.match(page, /if \(cached\) return cached;/);
  assert.match(page, /loadScienceExplanation\(\{ action: "science", chapterId: chapter\.id, messageId: message\.id \}\)\s*\.then/);
  assert.match(page, /scienceResponseCache\.delete\(cacheKey\)/);
});
