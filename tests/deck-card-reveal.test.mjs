import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const deck = await readFile(new URL("../lib/card-deck.ts", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("each rear card exposes at least half of the 42px source avatar", () => {
  assert.match(deck, /DECK_STACK_STEP = 50/);
  assert.match(deck, /DECK_REAR_CARD_COUNT = 4/);
  assert.match(deck, /DECK_STACK_RISE = DECK_STACK_STEP \* DECK_REAR_CARD_COUNT/);
});

test("truncated compact copy clearly leads into full reading", () => {
  assert.match(page, /message\.translation\.slice\(0, 40\)\}\.{3}/);
  assert.match(page, /isOriginalTruncated && <div className="compact-read-more-row"><button className="compact-read-more"/);
  assert.match(page, />阅读全文<\/button>/);
  assert.match(page, /event\.stopPropagation\(\); onDetail\?\.\(\)/);
});
