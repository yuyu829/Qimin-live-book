import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("cover opens a timed prologue before the interest question", () => {
  assert.match(page, /type Screen = [^;]*"prologue-loading"/);
  assert.match(page, /<Cover onNext=\{\(\) => setScreen\("prologue-loading"\)\}/);
  assert.match(page, /screen === "prologue-loading" && <PrologueLoading onBack=\{\(\) => setScreen\("cover"\)\}/);
  assert.match(page, /screen !== "prologue-loading"[\s\S]*setScreen\("interest"\)[\s\S]*6000/);
});

test("prologue reveals the supplied text in three quiet beats", () => {
  assert.match(page, /1500年前，《齐民要术》记录了古人与天地共生的生活秩序；/);
  assert.match(page, /今天，我们在新的时代里，萃取属于当下的生活真义。/);
  assert.match(page, /一代人有一代人的《齐民要术》。<br \/>欢迎来到这里，感知古今共通的生活哲学。/);
  assert.match(page, /<ArtImage src="\/art\/cover-world\.webp" alt="" className="prologue-loading-art" \/>/);
  assert.match(page, /aria-label="返回封面"/);
  assert.match(css, /\.prologue-loading-copy p\{[^}]*animation:prologueLineIn 1\.4s ease forwards/);
  assert.match(css, /\.prologue-loading-copy p:nth-child\(2\)\{margin-top:14px;animation-delay:1\.45s/);
  assert.match(css, /\.prologue-loading-copy p:nth-child\(3\)\{margin-top:28px;animation-delay:3\.05s/);
  assert.match(css, /\.prologue-loading-art\{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;[^}]*animation:prologueArtIn 1\.4s ease 3\.05s forwards/);
  assert.match(css, /\.prologue-loading-copy\{position:absolute;top:140px;left:50%;z-index:1;width:min\(calc\(100% - 32px\),390px\)/);
});
