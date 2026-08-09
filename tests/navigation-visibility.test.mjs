import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("top navigation only appears on book recommendations, map, and school", () => {
  assert.match(page, /const showTopBar = \["recommend", "map", "school"\]\.includes\(screen\)/);
  assert.doesNotMatch(page, /const showTopBar = !\["cover"\]\.includes\(screen\)/);
});

test("interest selection and chapter reader render without the shared top navigation", () => {
  const allowedScreens = page.match(/const showTopBar = \[([^\]]+)\]/)?.[1] ?? "";
  assert.doesNotMatch(allowedScreens, /interest/);
  assert.doesNotMatch(allowedScreens, /reader/);
});

test("school uses the same shared top navigation treatment as book and map", () => {
  assert.match(page, /screen === "school" \? "school-screen" : ""/);
  assert.match(css, /\.map-screen \.topbar,\.reading-screen \.topbar,\.school-screen \.topbar\{background:transparent;border-bottom-color:transparent;backdrop-filter:none\}/);
  assert.match(css, /\.school-screen \.topbar \.cat-mark-small,\.school-screen \.topbar \.progress-pill\{display:none\}/);
  assert.match(css, /\.school-screen \.topbar \.brand b\{font-size:21px\}/);
});
