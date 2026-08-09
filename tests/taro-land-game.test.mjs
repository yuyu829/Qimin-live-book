import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const artReadme = readFileSync(new URL("../public/art/README.md", import.meta.url), "utf8");

test("taro shortcut opens the first square field-selection game", () => {
  assert.match(page, /onClick=\{chapter\.id === "soybean" \? \(\) => setTaroGameOpen\(true\) : undefined\}/);
  assert.match(page, /taroGameOpen && chapter\.id === "soybean" && <TaroLandGame/);
  assert.match(page, /src="\/art\/taro-game-select-land\.webp"/);
  assert.match(css, /\.taro-game-scene\{[^}]*aspect-ratio:1/);
  assert.match(artReadme, /`taro-game-select-land\.webp` \| 1200 x 1200/);
});

test("field guidance is progressively revealed after wrong choices", () => {
  assert.match(page, /const landChoices = \[[\s\S]*地势高，较干硬，较远离水源[\s\S]*土质薄瘠，不够滋润[\s\S]*肥沃松软，靠近水源/);
  assert.match(page, /if \(index === 2\) \{[\s\S]*setSolved\(true\)/);
  assert.match(page, /wrongAttempts >= 1 && <div className="taro-land-details"/);
  assert.match(page, /wrongAttempts >= 2 && <blockquote className="taro-land-source">宜擇肥緩土近水處，和柔，糞之<\/blockquote>/);
});
