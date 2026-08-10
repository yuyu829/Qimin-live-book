import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const glossary = await readFile(new URL("../data/qimin-glossary.ts", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("every current message has at least five locally defined glossary terms", () => {
  for (const prefix of ["soy", "sauce"]) {
    for (let index = 1; index <= 8; index += 1) {
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
