import assert from "node:assert/strict";
import { test } from "node:test";

import { deckCardTransform, shouldDismissCard, SWIPE_DISMISS_DISTANCE } from "../lib/card-deck.ts";

test("dismisses only after a deliberate right swipe", () => {
  assert.equal(shouldDismissCard(SWIPE_DISMISS_DISTANCE - 1), false);
  assert.equal(shouldDismissCard(SWIPE_DISMISS_DISTANCE), true);
  assert.equal(shouldDismissCard(-160), false);
});

test("cards recede along the visual z axis", () => {
  assert.equal(deckCardTransform(0), "translate3d(0, 0px, 0px) scale(1) rotate(0deg)");
  assert.match(deckCardTransform(1), /translate3d\(0, -58px, -30px\) scale\(0\.94\) rotate\(-1\.2deg\)/);
  assert.match(deckCardTransform(2), /translate3d\(0, -116px, -60px\) scale\(0\.88\) rotate\(1\.2deg\)/);
});
