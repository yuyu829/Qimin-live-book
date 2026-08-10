import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const artReadme = await readFile(new URL("../public/art/README.md", import.meta.url), "utf8");

test("root README documents the current AI and interactive reading features", () => {
  assert.match(readme, /science-followup/);
  assert.match(readme, /当前卡片进入顶层时会预加载/);
  assert.match(readme, /种芋小游戏/);
  assert.match(readme, /做酱小游戏/);
  assert.match(readme, /Music1\.mp3/);
  assert.match(readme, /OPENAI_MODEL=gpt-4o-mini/);
  assert.match(readme, /data\/science-evidence\.ts/);
});

test("documented project files exist", async () => {
  for (const path of ["../data/qimin.ts", "../data/qimin-glossary.ts", "../data/science-evidence.ts", "../lib/qimin-prompts.ts", "../app/api/qimin/route.ts"]) {
    await access(new URL(path, import.meta.url));
  }
});

test("art README lists current animated, game, collection and audio assets", () => {
  for (const asset of ["taro-cat.gif", "sauce-cat.gif", "sauce-game-ferment-background.webp", "book-guide-avatar.webp", "Music1.mp3", "Music2.mp3"]) {
    assert.match(artReadme, new RegExp(asset.replace(".", "\\.")));
  }
  assert.match(artReadme, /制饼喵/);
  assert.doesNotMatch(artReadme, /种饼喵/);
});
