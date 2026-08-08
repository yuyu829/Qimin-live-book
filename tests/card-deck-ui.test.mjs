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
