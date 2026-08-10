import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const artReadme = await readFile(new URL("../public/art/README.md", import.meta.url), "utf8");

test("book guide uses a replaceable bitmap avatar instead of the vector cat mark", () => {
  const guide = page.match(/<div className="guide-answer">(.*?)<div><b>书页向导<\/b>/s)?.[1] ?? "";
  assert.match(guide, /src="\/art\/book-guide-avatar\.webp"/);
  assert.match(guide, /alt="书页向导头像"/);
  assert.match(guide, /school-cat-avatar\.webp/);
  assert.doesNotMatch(guide, /CatMark/);
  assert.match(artReadme, /`book-guide-avatar\.webp` \| 200 x 200 \| 书本向导对话头像/);
});
