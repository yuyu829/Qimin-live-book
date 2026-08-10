import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/detail-question.module.css", import.meta.url), "utf8");

test("science explanation provides an accessible reload control", () => {
  assert.match(page, /aria-label="重新加载现代科学解释"/);
  assert.match(page, /onClick=\{reloadScience\}/);
  assert.match(page, /<RefreshCw className=\{science\.loading \? "spin" : undefined\}/);
  assert.match(styles, /\.scienceHeading button/);
  assert.match(styles, /\.scienceHeading \{\s*position: relative;/);
  assert.match(styles, /\.scienceHeading button \{\s*position: absolute;\s*top: 50%;\s*right: 0;/);
  assert.doesNotMatch(styles, /\.scienceHeading \{[^}]*display: flex/s);
});

test("reload clears the cached explanation and requests a fresh answer", () => {
  assert.match(page, /if \(refresh\) scienceResponseCache\.delete\(cacheKey\);/);
  assert.match(page, /loadScienceExplanation\(\{ action: "science", chapterId: chapter\.id, messageId: message\.id \}, true\)/);
  assert.match(page, /setScience\(\{ loading: true \}\);\s*setScienceSources\(\[\]\);/);
});
