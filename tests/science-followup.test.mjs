import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const route = await readFile(new URL("../app/api/qimin/route.ts", import.meta.url), "utf8");
const prompts = await readFile(new URL("../lib/qimin-prompts.ts", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/detail-question.module.css", import.meta.url), "utf8");

test("detail reader has a fixed science follow-up bar", () => {
  assert.match(page, /placeholder="还有疑问？追问试试！"/);
  assert.match(page, /aria-label="追问现代科学解释"/);
  assert.match(styles, /position: fixed/);
  assert.match(styles, /bottom: 0/);
  assert.match(styles, /width: min\(100%, 430px\)/);
});

test("science follow-ups stay below sources and push the glossary down", () => {
  assert.match(page, /资料来源：.*followups\.map.*detail-terms/s);
  assert.match(page, /followupQuestion/);
  assert.match(page, /followupAnswer/);
  assert.match(styles, /\.detailWithQuestion \{ padding-bottom: 112px; \}/);
});

test("science follow-up calls the model with only the current card context", () => {
  assert.match(page, /action: "science-followup", chapterId: chapter\.id, messageId: message\.id, question: text/);
  assert.match(route, /body\.action === "science-followup"/);
  assert.match(prompts, /当前这条古代经验的现代科学追问/);
  assert.match(prompts, /现代机制只能依据知识底稿/);
});
