import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("community sharing page uses the revised wall copy without changing publishing", () => {
  assert.match(page, /<h2>把你的生活门道<br \/>分享在这里吧<\/h2>/);
  assert.match(page, /<p>一代人就应该有一代人的《齐民要术》！<\/p>/);
  assert.match(page, /placeholder="比如：头疼的时候可以闭上眼睛，把痛的区域幻想成紫色可以缓解疼痛"/);
  assert.match(page, /<form className="note-form" onSubmit=\{publish\}>/);
  assert.match(page, /<button disabled=\{!text\.trim\(\)\}>贴上墙 <Send size=\{15\} \/>/);
});
