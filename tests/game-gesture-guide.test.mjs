import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("first right and down gestures show a large floating guide for a few seconds", () => {
  assert.match(page, /function GestureGuide\(\{ direction \}/);
  assert.match(page, /window\.setTimeout\(\(\) => step === "steam" \? setShowSteamGuide\(false\) : setShowPeelGuide\(false\), 3200\)/);
  assert.match(page, /window\.setTimeout\(\(\) => setShowDigGuide\(false\), 3200\)/);
  assert.match(page, /showSteamGuide && <GestureGuide direction="right" \/>/);
  assert.match(page, /showPeelGuide && <GestureGuide direction="down" \/>/);
  assert.match(page, /showDigGuide && <GestureGuide direction="right" \/>/);
  assert.match(page, /showDeckGuide && currentIndex === 0 && <GestureGuide direction="right" \/>/);
  assert.match(page, /function startSteam[\s\S]*setShowSteamGuide\(false\)/);
  assert.match(page, /function startPeel[\s\S]*setShowPeelGuide\(false\)/);
  assert.match(page, /function startDig[\s\S]*setShowDigGuide\(false\)/);
  assert.match(page, /function handlePointerDown[\s\S]*setShowDeckGuide\(false\)/);
  assert.match(css, /\.gesture-guide\{position:absolute;left:50%;top:50%;z-index:5;width:84px;height:72px/);
  assert.match(css, /@keyframes gestureGuideRight/);
  assert.match(css, /@keyframes gestureGuideDown/);
  assert.match(css, /\.deck-stage>\.gesture-guide\{z-index:30\}/);
});
