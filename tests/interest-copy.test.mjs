import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("interest page uses the revised preference copy without changing its controls", () => {
  assert.match(page, /<p className="overline">偏好设定<\/p>/);
  assert.match(page, /<h2>选择你的关注<\/h2>/);
  assert.doesNotMatch(page, /选择你的关注，看看古书里的人会怎么解决这些生活问题。/);
  assert.match(page, /<p className="subcopy">随手选一个，翻开两千年前的生活妙招。<\/p>/);
  assert.match(page, /title: "饮食烹饪", text: "食材保鲜、古法发酵与烹饪"/);
  assert.match(page, /title: "冷知识溯源", text: "生活妙招背后的历史与科学"/);
  assert.match(page, /disabled=\{!selected\} className="primary-button full-button" onClick=\{onNext\}>按此启卷 <ArrowRight size=\{18\} \/>/);
});
