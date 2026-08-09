import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("cover uses the seasonal living introduction", () => {
  assert.match(page, /<p className="cover-kicker">顺应四时，因地制宜；<br \/>用心对待一顿饭、一棵植物、一件器物。<\/p>/);
  assert.doesNotMatch(page, /两千年前的生活妙招博主/);
});
