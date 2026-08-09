import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const artReadme = readFileSync(new URL("../public/art/README.md", import.meta.url), "utf8");

test("taro shortcut opens the first square field-selection game", () => {
  assert.match(page, /onClick=\{chapter\.id === "soybean" \? \(\) => setTaroGameOpen\(true\) : \(\) => setSauceGameOpen\(true\)\}/);
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
  assert.doesNotMatch(page, /\(solved \|\| wrongAttempts >= 2\) && <blockquote/);
});

test("correct field feedback includes the source text", () => {
  assert.match(page, /<b>选对了<\/b><span>肥沃松软、靠近水源的土地更适合种芋。<\/span><small>《齐民要术》：“宜擇肥緩土近水處，和柔，糞之。”<\/small>/);
  assert.match(css, /\.taro-land-success small\{[^}]*border-top:1px solid rgba\(255,253,245,\.35\)[^}]*font:600 11px\/1\.7/);
});

test("correct land choice continues to the three-swipe digging step", () => {
  assert.match(page, /<button type="button" onClick=\{\(\) => setStep\("dig"\)\}>下一步：挖地<\/button>/);
  assert.match(page, /function startDig\(event: ReactPointerEvent<HTMLDivElement>\)/);
  assert.match(page, /if \(swipeDistance < 55 \|\| digAnimating\) return;/);
  assert.match(page, /onPointerDown=\{startDig\} onPointerMove=\{moveDig\} onPointerUp=\{finishDig\} onPointerCancel=\{finishDig\}/);
  assert.match(page, /digCount >= 3 \? "\/art\/taro-game-dig-complete\.webp" : digFrame === 1 \? "\/art\/taro-game-dig-1\.webp" : "\/art\/taro-game-dig-2\.webp"/);
  assert.match(page, /aria-label=\{`挖地进度 \$\{digCount\}\/3`\}/);
  assert.match(css, /\.taro-dig-scene\{touch-action:none/);
});

test("each dig swipe plays frame two then frame one before counting progress", () => {
  assert.match(page, /setDigAnimating\(true\);[\s\S]*setDigFrame\(2\);/);
  assert.match(page, /window\.setTimeout\(\(\) => \{[\s\S]*setDigFrame\(1\);[\s\S]*window\.setTimeout\(\(\) => \{[\s\S]*setDigCount\(\(count\) => Math\.min\(3, count \+ 1\)\)/);
  assert.match(page, /digAnimating \? "挥锄挖地中…"/);
});

test("digging artwork placeholders are documented as square assets", () => {
  assert.match(artReadme, /`taro-game-dig-1\.webp` \| 1200 x 1200/);
  assert.match(artReadme, /`taro-game-dig-2\.webp` \| 1200 x 1200/);
  assert.match(artReadme, /`taro-game-dig-complete\.webp` \| 1200 x 1200/);
});

test("completed digging feedback includes the source text", () => {
  assert.match(page, /<b>挖地完成<\/b><span>土地已经松整，可以继续下一步了。<\/span><small>《齐民要术》：“種芋，區方深皆三尺。”<\/small>/);
  assert.match(css, /\.taro-dig-complete small\{[^}]*border-top:1px solid rgba\(255,253,245,\.35\)[^}]*font:600 10px\/1\.6/);
});

test("digging continues to five ordered taro placement points", () => {
  assert.match(page, /const taroPlacementPoints = \[[\s\S]*左上[\s\S]*右上[\s\S]*左下[\s\S]*右下[\s\S]*中央/);
  assert.match(page, /onClick=\{\(\) => setStep\("place"\)\}>下一步：放置芋头<\/button>/);
  assert.match(page, /const placementImage = `\/art\/taro-game-place-\$\{placedTaroCount\}\.webp`/);
  assert.match(page, /disabled=\{index !== placedTaroCount \|\| placedTaroCount >= 5\}/);
  assert.match(page, /setPlacedTaroCount\(\(count\) => Math\.min\(5, count \+ 1\)\)/);
  assert.match(css, /\.place-top-left\{left:29%;top:34%\}[\s\S]*\.place-center\{left:50%;top:53%\}/);
});

test("placing all five taros shows the source and uses five documented frames", () => {
  assert.match(page, /<b>五个芋头已放好<\/b><span>四角与中央各放一个，再用脚踏实。<\/span><small>《齐民要术》：“取五芋子置四角及中央，足践之。”<\/small>/);
  for (let index = 1; index <= 5; index += 1) assert.match(artReadme, new RegExp(`taro-game-place-${index}\\.webp.*1200 x 1200`));
  assert.match(css, /\.taro-place-progress\{display:grid;grid-template-columns:repeat\(5,28px\)/);
});

test("placement step has its own empty-land frame before the five taros", () => {
  assert.match(artReadme, /`taro-game-place-0\.webp` \| 1200 x 1200 \| 第三步刚进入时、尚未放置芋头的空土地画面/);
  assert.match(page, /placedTaroCount\}\.webp/);
});

test("placing five taros continues to a ten-second watering video", () => {
  assert.match(page, /onClick=\{\(\) => setStep\("water"\)\}>下一步：浇水<\/button>/);
  assert.match(page, /if \(step !== "water"\) return;[\s\S]*window\.setTimeout\(\(\) => setWaterComplete\(true\), 10000\)/);
  assert.match(page, /<video className="taro-water-video" src="\/art\/taro-game-water\.mp4" autoPlay muted playsInline preload="auto"/);
  assert.match(page, /<blockquote className="taro-water-source">旱，數澆之。<\/blockquote>/);
  assert.match(page, /<p className="taro-water-copy">芋头怕旱，干旱时要多浇水。<\/p>/);
  assert.match(css, /animation:taroWaterProgress 10s linear both/);
  assert.match(artReadme, /`taro-game-water\.mp4` \| 1200 x 1200，10 秒/);
});

test("watering completion unlocks the taro cat collection entry", () => {
  assert.match(page, /waterComplete && <div className="taro-unlock-card"[\s\S]*src="\/art\/taro-cat\.gif" alt="已解锁的芋头喵"[\s\S]*<b>图鉴已解锁<\/b><span>芋头喵<\/span>/);
  assert.match(page, /<button type="button" onClick=\{onClose\}>完成游戏<\/button>/);
  assert.match(css, /\.taro-unlock-card img\{[^}]*width:128px;height:128px;object-fit:contain/);
});
