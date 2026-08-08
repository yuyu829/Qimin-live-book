import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const qiminData = await readFile(new URL("../data/qimin.ts", import.meta.url), "utf8");

test("soybean slot contains the complete taro chapter source", () => {
  assert.match(qiminData, /title: "《種芋第十六》"/);
  assert.match(qiminData, /《说文》曰：“芋，大叶实根骇人者/);
  assert.match(qiminData, /《广志》曰：“蜀汉既繁芋/);
  assert.match(qiminData, /《汜胜之书》曰：“种芋，区方深皆三尺/);
  assert.match(qiminData, /《列仙传》曰：“酒客为梁/);
  assert.match(qiminData, /《家政法》曰：“二月可种芋也。”/);
  assert.equal((qiminData.match(/id: "soy-\d+"/g) ?? []).length, 8);
});

test("reading recommendations stay inside one app viewport", () => {
  assert.match(css, /\.recommend-page\{height:calc\(100svh - 68px\);min-height:0;overflow:hidden/);
  assert.match(css, /\.recommend-page \.chapter-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:10px\}/);
  assert.match(css, /\.recommend-page \.tile-art\{height:160px\}/);
  assert.match(css, /\.recommend-page \.tile-body\{padding:16px\}/);
  assert.match(page, /className="reading-art-placeholder" aria-label="读书页插画占位"/);
  assert.match(page, /src="\/art\/reading-world\.webp" alt="读书页田园插画" className="reading-art-image"/);
  assert.match(css, /\.recommend-heading\{margin-bottom:20px\}/);
  assert.match(css, /\.reading-art-placeholder\{height:256px;overflow:hidden;mask-image:radial-gradient/);
  assert.match(css, /\.reading-art-placeholder\{[^}]*border:0/);
});

test("chapter title bar removes its illustration placeholder", () => {
  assert.doesNotMatch(page, /className="chapter-symbol"/);
});

test("recommendation cards load their chapter artwork assets", () => {
  assert.match(page, /src=\{`\/art\/chapter-\$\{chapter\.id\}\.webp`\} alt=\{`\$\{chapter\.title\}章节插画`\} className="tile-art-image"/);
  assert.match(css, /\.tile-art-image\{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:4\}/);
});

test("chapter number stays above artwork while legacy vector decorations stay below", () => {
  assert.match(css, /\.tile-art-image\{[^}]*z-index:4\}\.tile-art \.chapter-number\{z-index:6\}/);
});

test("map artwork fills the viewport without legacy place overlays", () => {
  assert.match(css, /\.map-page\{[^}]*height:calc\(100svh - 68px\)[^}]*overflow:hidden/);
  assert.match(css, /\.map-page \.world-map\{position:absolute;inset:0;width:100%;height:100%/);
  assert.match(page, /data-map-coordinate-space="853x1844"/);
  assert.doesNotMatch(page, /place-farm|place-brew|place-school|locked-place|map-river/);
});

test("map hotspots use the original artwork coordinate system", () => {
  assert.match(page, /viewBox="0 0 853 1844" preserveAspectRatio="xMidYMin slice"/);
  assert.match(page, /x="306" y="304" width="242" height="242"[^>]*onClick=\{\(\) => setVolume\("soybean"\)\}/);
  assert.match(page, /x="20" y="868" width="242" height="242"[^>]*onClick=\{\(\) => setVolume\("sauce"\)\}/);
  assert.match(css, /\.map-hotspots\{position:absolute;inset:0;z-index:3;width:100%;height:100%\}/);
});

test("map hotspots open volume chapter pickers", () => {
  assert.match(page, /const mapVolumes = \{/);
  assert.match(page, /className="map-volume-popover"/);
  assert.match(page, /mapVolumes\[volume\]\.items\.map/);
  assert.match(css, /\.map-volume-backdrop\{position:absolute;inset:0/);
  assert.match(css, /\.map-volume-list\{display:flex;flex-wrap:wrap/);
});

test("map navigation is transparent and simplified", () => {
  assert.match(page, /screen === "map" \? "map-screen"/);
  assert.match(page, /screen === "recommend" \? "reading-screen"/);
  assert.match(css, /\.map-screen \.topbar,.reading-screen \.topbar\{background:transparent;border-bottom-color:transparent/);
  assert.match(css, /\.map-screen \.topbar \.brand b,.reading-screen \.topbar \.brand b\{font-size:21px\}/);
  assert.match(css, /\.map-screen \.topbar \.brand small,.reading-screen \.topbar \.brand small\{font-size:11px;margin-top:7px/);
  assert.match(css, /\.map-page \.world-map-art\{object-fit:cover;object-position:top/);
  assert.match(css, /\.app-shell\.map-screen\{padding-top:0\}/);
  assert.match(css, /\.map-screen \.map-page\{height:100svh\}/);
});

test("map shows the Xia He Miao profile placeholder below navigation", () => {
  assert.match(page, /className="map-profile" aria-label="小禾喵等级 Lv2 小学徒"/);
  assert.match(page, /src="\/art\/map-cat-avatar\.webp" alt="小禾喵头像" className="map-profile-image"/);
  assert.match(css, /\.map-profile\{position:absolute;top:88px;left:16px/);
  assert.match(css, /\.map-profile\{[^}]*width:210px/);
  assert.match(page, /className="map-level-track" role="progressbar"/);
  assert.match(page, /className="map-level-track" role="progressbar"[^>]*aria-valuenow=\{46\}/);
  assert.match(css, /\.map-level-track\{[^}]*width:124px;height:7px/);
  assert.match(css, /\.map-level-track i\{[^}]*width:46%/);
  assert.match(page, /className="map-pouch-button" type="button" aria-label="打开图鉴"/);
  assert.match(page, /src="\/art\/map-pouch\.webp" alt="图鉴" className="map-pouch-image"/);
  assert.match(css, /\.map-pouch-button\{[^}]*top:88px[^}]*width:64px;height:64px/);
  assert.match(css, /\.map-pouch-button\{[^}]*flex-direction:column/);
  assert.match(css, /\.map-pouch-image\{[^}]*width:38px;height:38px/);
  assert.match(css, /\.map-pouch-button\{position:absolute;top:88px;right:16px;[^}]*width:64px;height:64px/);
  assert.match(page, /onClick=\{\(\) => setPouchOpen\(true\)\}/);
  assert.match(page, /className="pouch-grid"/);
  assert.match(page, /<h2>我的图鉴<\/h2>/);
  assert.equal((page.match(/map-cat-(?:taro|sauce|chili|chicken|tree|cake|jujube|persimmon|fish)\.webp/g) ?? []).length, 9);
  assert.match(css, /\.pouch-grid\{display:grid;grid-template-columns:repeat\(3/);
});

test("soybean chapter slot contains the selected taro source content", () => {
  assert.match(qiminData, /title: "《種芋第十六》"/);
  assert.match(qiminData, /《汜胜之书》曰：“种芋，区方深皆三尺/);
  assert.match(qiminData, /《列仙传》曰：“酒客为梁/);
  assert.match(qiminData, /崔寔曰：“正月，可菹芋。”/);
  assert.doesNotMatch(qiminData, /《氾胜之区种大豆法》/);
});
