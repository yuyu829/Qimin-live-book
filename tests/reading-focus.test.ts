import assert from "node:assert/strict";
import { test } from "node:test";

import { pickFocusedMessage } from "../lib/reading-focus.ts";

test("selects the message nearest the reading line", () => {
  const focused = pickFocusedMessage([
    { index: 0, top: 80, bottom: 270 },
    { index: 1, top: 300, bottom: 540 },
    { index: 2, top: 570, bottom: 790 }
  ], 800);

  assert.equal(focused, 1);
});

test("focus returns to an older message after scrolling upward", () => {
  const focused = pickFocusedMessage([
    { index: 0, top: 260, bottom: 510 },
    { index: 1, top: 540, bottom: 800 },
    { index: 2, top: 830, bottom: 1060 }
  ], 800);

  assert.equal(focused, 0);
});

test("keeps the newest visible message focused near the bottom", () => {
  const focused = pickFocusedMessage([
    { index: 0, top: -360, bottom: -80 },
    { index: 1, top: -40, bottom: 210 },
    { index: 2, top: 250, bottom: 540 }
  ], 800);

  assert.equal(focused, 2);
});
