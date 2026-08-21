import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/detail-question.module.css", import.meta.url), "utf8");

test("long science explanations are grouped into readable sentence paragraphs", () => {
  assert.match(page, /function scienceParagraphs\(text: string\)/);
  assert.match(page, /text\.length <= 140/);
  assert.match(page, /paragraph\.length \+ sentence\.length > 110/);
  assert.match(page, /scienceParagraphs\(science\.loading \? "正在请教现代科学AI小助手…"/);
});

test("science paragraphs keep visual breathing room", () => {
  assert.match(page, /className=\{detailStyles\.scienceAnswer\}/);
  assert.match(styles, /\.scienceAnswer p \{ margin: 0 0 12px !important; \}/);
  assert.match(styles, /\.scienceAnswer p:last-of-type \{ margin-bottom: 0 !important; \}/);
});
