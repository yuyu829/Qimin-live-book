import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("top deck card binds pointer gestures", () => {
  assert.match(page, /onPointerDown=\{isTop \? handlePointerDown : undefined\}/);
  assert.match(page, /onPointerMove=\{isTop \? handlePointerMove : undefined\}/);
  assert.match(page, /onPointerUp=\{isTop \? handlePointerUp : undefined\}/);
});

test("deck includes depth transitions and swipe exit animation", () => {
  assert.match(css, /\.deck-card\{[^}]*transition:transform \.38s/);
  assert.match(css, /\.deck-card\.is-dismissing/);
  assert.match(css, /perspective:1000px/);
});

test("deck card height follows its content", () => {
  assert.match(css, /\.deck-stage\{[^}]*display:grid/);
  assert.match(css, /\.deck-card\{[^}]*grid-area:1\/1[^}]*min-height:0[^}]*max-height:none/);
  assert.doesNotMatch(css, /\.deck-card\{[^}]*min-height:430px/);
  assert.doesNotMatch(css, /\.deck-stage\{[^}]*min-height:590px/);
});

test("rear cards have visible room above the lowered front card", () => {
  assert.match(css, /\.deck-stage\{[^}]*padding-top:220px/);
});

test("scene marker is attached to the top of the deck", () => {
  assert.match(page, /className="date-divider deck-date"/);
  assert.match(css, /\.deck-date\{position:absolute;top:-24px/);
  assert.match(page, /slice\(currentIndex, currentIndex \+ 5\)/);
});

test("annotated original terms have a highlighted text style", () => {
  assert.match(css, /\.original-term\{[^}]*font-weight:800/);
});
