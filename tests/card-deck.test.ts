import assert from "node:assert/strict";
import { test } from "node:test";

import { DECK_STACK_RISE, deckCardTransform, shouldDismissCard, SWIPE_DISMISS_DISTANCE } from "../lib/card-deck.ts";

test("dismisses only after a deliberate right swipe", () => {
  assert.equal(shouldDismissCard(SWIPE_DISMISS_DISTANCE - 1), false);
  assert.equal(shouldDismissCard(SWIPE_DISMISS_DISTANCE), true);
  assert.equal(shouldDismissCard(-160), false);
});

test("cards recede along the visual z axis", () => {
  assert.equal(deckCardTransform(0), "translate3d(0, 0px, 0px) scale(1) rotate(0deg)");
  assert.match(deckCardTransform(1), /translate3d\(0, -22px, -24px\) scale\(0\.95\) rotate\(-1\.2deg\)/);
  assert.match(deckCardTransform(2), /translate3d\(0, -44px, -48px\) scale\(0\.9\) rotate\(1\.2deg\)/);
  assert.match(deckCardTransform(4), /translate3d\(0, -88px, -96px\) scale\(0\.8\) rotate\(1\.2deg\)/);
  assert.equal(DECK_STACK_RISE, 88);
});
