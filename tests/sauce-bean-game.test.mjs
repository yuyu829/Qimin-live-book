import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const data = readFileSync(new URL("../data/qimin.ts", import.meta.url), "utf8");
const artReadme = readFileSync(new URL("../public/art/README.md", import.meta.url), "utf8");

test("sauce shortcut opens the square bean-selection game", () => {
  assert.match(page, /chapter\.id === "soybean" \? \(\) => setTaroGameOpen\(true\) : \(\) => setSauceGameOpen\(true\)/);
  assert.match(page, /sauceGameOpen && chapter\.id === "sauce" && <SauceBeanGame/);
  assert.match(page, /src="\/art\/sauce-game-select-beans\.webp"/);
  assert.match(artReadme, /`sauce-game-select-beans\.webp` \| 1200 x 1200/);
});

test("bean choices reveal guidance progressively and select spring black beans", () => {
  assert.match(page, /const sauceBeanChoices = \[[\s\S]*晚播大白豆[\s\S]*秋收获黄豆[\s\S]*春种乌豆/);
  assert.match(page, /function chooseBean\(index: number\)[\s\S]*if \(index === 2\)[\s\S]*setSolved\(true\)/);
  assert.match(page, /wrongAttempts >= 1 && <div className="taro-land-details sauce-bean-details"/);
  assert.match(page, /wrongAttempts >= 2 && <blockquote className="taro-land-source">用春種烏豆，春豆粒小而均，晚豆粒大而雜。<\/blockquote>/);
  assert.match(page, /秋收获黄豆", detail: "黄豆多在秋季成熟，但此处古法比较的是播种时节与豆粒是否细小均匀，并非单看收获季节"/);
});

test("correct bean feedback quotes the recorded sauce source", () => {
  const source = "用春種烏豆，春豆粒小而均，晚豆粒大而雜。";
  assert.ok(data.includes(source));
  assert.ok(page.includes(`《齐民要术》：“${source}”`));
  assert.match(page, /<b>选对了<\/b><span>春豆粒小而均，更适合制酱。<\/span>/);
});

test("correct beans continue to a right-drag steaming step", () => {
  assert.match(page, /const \[step, setStep\] = useState<"beans" \| "steam" \| "peel" \| "recipe">\("beans"\)/);
  assert.match(page, /onClick=\{\(\) => setStep\("steam"\)\}>下一步：蒸豆<\/button>/);
  assert.match(page, /function startSteam\(event: ReactPointerEvent<HTMLButtonElement>\)/);
  assert.match(page, /const max = track \? track\.clientWidth - event\.currentTarget\.offsetWidth - 8 : 0/);
  assert.match(page, /if \(steamStart\.current\.max > 0 && distance >= steamStart\.current\.max \* 0\.8\)[\s\S]*setSteamDrag\(steamStart\.current\.max\)[\s\S]*setSteamed\(true\)/);
  assert.match(page, /向右拖动点火，让豆子充分蒸熟/);
  assert.match(page, /aria-label="向右拖动点火按钮"[\s\S]*onPointerDown=\{startSteam\}[\s\S]*onPointerMove=\{moveSteam\}[\s\S]*onPointerUp=\{finishSteam\}[\s\S]*>点火<\/button>/);
});

test("steaming switches between two square art placeholders and reveals the source", () => {
  assert.match(page, /sauce-game-steam-\$\{steamed \? "2" : "1"\}\.webp/);
  assert.match(page, /steamed && <blockquote className="taro-land-source">於大甑中燥蒸之。<\/blockquote>/);
  assert.match(artReadme, /`sauce-game-steam-1\.webp` \| 1200 x 1200/);
  assert.match(artReadme, /`sauce-game-steam-2\.webp` \| 1200 x 1200/);
});

test("steamed beans continue to a three-swipe peeling step", () => {
  assert.match(page, /useState<"beans" \| "steam" \| "peel" \| "recipe">\("beans"\)/);
  assert.match(page, /onClick=\{\(\) => setStep\("peel"\)\}>下一步：去皮<\/button>/);
  assert.match(page, /function startPeel\(event: ReactPointerEvent<HTMLDivElement>\)/);
  assert.match(page, /function finishPeel[\s\S]*if \(swipeDistance >= 70\) setPeelCount\(\(count\) => Math\.min\(3, count \+ 1\)\)/);
  assert.match(page, /onPointerDown=\{startPeel\}[\s\S]*onPointerMove=\{movePeel\}[\s\S]*onPointerUp=\{finishPeel\}/);
});

test("three downward swipes advance through four peeling frames", () => {
  assert.match(page, /sauce-game-peel-\$\{peelCount \+ 1\}\.webp/);
  assert.match(page, /peelCount >= 3[\s\S]*<b>去皮完成<\/b>/);
  for (let frame = 1; frame <= 4; frame += 1) {
    assert.ok(artReadme.includes(`\`sauce-game-peel-${frame}.webp\` | 1200 x 1200`));
  }
});

test("peeling detects downward swipes without dragging the artwork", () => {
  assert.doesNotMatch(page, /className="taro-game-image sauce-peel-image" style=/);
});

test("peeled beans continue to the four-ingredient recipe step", () => {
  assert.match(page, /useState<"beans" \| "steam" \| "peel" \| "recipe">\("beans"\)/);
  assert.match(page, /onClick=\{\(\) => setStep\("recipe"\)\}>下一步：配方<\/button>/);
  assert.match(page, /src="\/art\/sauce-game-recipe\.webp"/);
  assert.match(artReadme, /`sauce-game-recipe\.webp` \| 1200 x 1200/);
});

test("recipe clicks match the recorded quantities and units", () => {
  assert.match(page, /const sauceRecipeIngredients = \[[\s\S]*豆黄", target: 3, unit: "斗"[\s\S]*麦麴", target: 1, unit: "斗"[\s\S]*黄蒸", target: 1, unit: "斗"[\s\S]*白盐", target: 5, unit: "升"/);
  assert.match(page, /function addRecipeIngredient\(index: number\)[\s\S]*Math\.min\(sauceRecipeIngredients\[index\]\.target, amount \+ 1\)/);
  assert.match(page, /大率豆黃三斗，麴末一斗，黃蒸末一斗，白鹽五升。/);
  assert.match(page, /recipeMatched && <div className="taro-land-success"[\s\S]*<b>配方配对完成<\/b>/);
});

test("each recipe click shows a local enlarging plus-one feedback", () => {
  assert.match(page, /setRecipeFeedback\(\(feedback\) => \(\{ index, key: \(feedback\?\.key \?\? 0\) \+ 1 \}\)\)/);
  assert.match(page, /recipeFeedback\?\.index === index && <i key=\{recipeFeedback\.key\} className="recipe-add-feedback">\+1\{ingredient\.unit\}<\/i>/);
  assert.match(css, /\.recipe-add-feedback\{[\s\S]*animation:recipeAddFeedback \.65s ease-out both/);
  assert.match(css, /@keyframes recipeAddFeedback\{[\s\S]*scale\(1\.3\)[\s\S]*opacity:0/);
});
