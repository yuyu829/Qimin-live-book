import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("reading recommendations use the revised chapter discussion copy", () => {
  assert.match(page, /<p className="overline">两场正在上演的农人经验谈<\/p>/);
  assert.match(page, /<h2>今日为你推荐章节<\/h2>/);
  assert.match(page, /<p className="subcopy">入席旁听:看典籍记录、农谚俚语与贾公智慧的隔空交锋<\/p>/);
  assert.match(page, /<div className="chapter-grid">/);
});
