import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const glossary = await readFile(new URL("../data/qimin-glossary.ts", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("every current message has at least five locally defined glossary terms", () => {
  const limits = { soy: 8, sauce: 9 };
  for (const prefix of ["soy", "sauce"]) {
    for (let index = 1; index <= limits[prefix]; index += 1) {
      const match = glossary.match(new RegExp(`"${prefix}-${index}": \\[(.*?)\\]`));
      assert.ok(match, `${prefix}-${index} should have a glossary list`);
      const words = match[1].match(/"[^"]+"/g) ?? [];
      assert.ok(words.length >= 5, `${prefix}-${index} should have at least five terms`);
    }
  }
});

test("reader uses local definitions before calling AI", () => {
  assert.match(page, /termsForMessage\(message\)/);
  assert.match(page, /if \(term\.definition\)/);
  assert.match(page, /messageTerms\.filter\(\(term\) => !term\.definition\)/);
  assert.match(glossary, /definition: /);
});

test("sauce chapter marks facing Tai Sui as a historical belief without modern evidence", () => {
  assert.match(glossary, /"太岁": \{ word: "太岁", category: "古代岁神方位"/);
  assert.match(glossary, /🟠 古今知识注释：这是古代传统观念或经验性做法，目前没有现代科学证据证明“面向太岁”会影响酱的发酵或品质/);
  assert.match(glossary, /因此，这里应理解为《齐民要术》中的历史记载，而非现代科学结论。/);
});

test("sauce chapter marks pregnancy and sauce-restoration lore as historical not scientific", () => {
  assert.match(glossary, /目前没有可靠现代科学证据证明“妊娠妇人”本身会导致酱变坏/);
  assert.match(glossary, /目前缺乏现代科学证据支持“放入白叶棘子就能使坏酱恢复正常”这一因果关系/);
  assert.match(glossary, /原文说用新汲水和了再给，酱才不会坏。这是古代经验性说法，目前缺乏现代科学证据支持其因果关系。/);
});
