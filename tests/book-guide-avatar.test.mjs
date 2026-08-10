import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const artReadme = await readFile(new URL("../public/art/README.md", import.meta.url), "utf8");

test("teacher guide uses a replaceable bitmap avatar instead of the vector cat mark", () => {
  const guide = page.match(/<div className="guide-answer">(.*?)<div><b>教书先生<\/b>/s)?.[1] ?? "";
  assert.match(guide, /src="\/art\/book-guide-avatar\.webp"/);
  assert.match(guide, /alt="教书先生头像"/);
  assert.match(guide, /school-cat-avatar\.webp/);
  assert.doesNotMatch(guide, /CatMark/);
  assert.match(artReadme, /`book-guide-avatar\.webp` \| 200 x 200 \| 教书先生对话头像/);
});
