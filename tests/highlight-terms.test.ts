import assert from "node:assert/strict";
import { test } from "node:test";

import { highlightTerms } from "../lib/highlight-terms.ts";

test("highlights all glossary terms without changing the original text", () => {
  const text = "坎方深各六寸，相去二尺。";
  const parts = highlightTerms(text, ["坎", "寸"]);
  assert.deepEqual(parts, [
    { text: "坎", highlighted: true },
    { text: "方深各六", highlighted: false },
    { text: "寸", highlighted: true },
    { text: "，相去二尺。", highlighted: false }
  ]);
  assert.equal(parts.map((part) => part.text).join(""), text);
});
