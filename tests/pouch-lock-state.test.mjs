import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("collection cats show a centered locked badge until their games are completed", () => {
  assert.match(page, /type CatUnlock = "taro" \| "sauce"/);
  assert.match(page, /localStorage\.getItem\("qimin-unlocked-cats"\)/);
  assert.match(page, /localStorage\.setItem\("qimin-unlocked-cats", JSON\.stringify\(next\)\)/);
  assert.match(page, /const showcaseUnlockedCats = new Set\(\["chili", "chicken", "tree"\]\)/);
  assert.match(page, /const unlocked = showcaseUnlockedCats\.has\(id\) \|\| \(\(id === "taro" \|\| id === "sauce"\) && unlockedCats\.includes\(id\)\)/);
  assert.match(page, /!unlocked && <span className="pouch-lock-badge">待解锁<\/span>/);
  assert.match(page, /onUnlock=\{\(\) => onUnlockCat\("taro"\)\}/);
  assert.match(page, /onUnlock=\{\(\) => onUnlockCat\("sauce"\)\}/);
  assert.match(css, /\.pouch-lock-badge\{position:absolute;left:50%;top:50%;[^}]*width:44px;height:44px[^}]*border-radius:50%[^}]*background:rgba\(104,104,104,\.62\)/);
});
