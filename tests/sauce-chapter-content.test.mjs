import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const data = await readFile(new URL("../data/qimin.ts", import.meta.url), "utf8");
const sauce = data.slice(data.indexOf('id: "sauce"'));

test("sauce chapter uses the supplied chapter identity and eight-step reading sequence", () => {
  assert.match(sauce, /title: "《作酱等法第七十》"/);
  assert.equal((sauce.match(/id: "sauce-\d+"/g) ?? []).length, 8);
  assert.doesNotMatch(sauce, /title: "《作酱法》"/);
});

test("sauce chapter preserves the source's main soybean sauce process", () => {
  for (const sourcePhrase of [
    "十二月、正月為上時",
    "用春種烏豆",
    "慎勿易湯",
    "豆黃三斗",
    "以滿為限；半則難熟",
    "臘月五七日",
    "十日內，每日數度以杷徹底攪之",
    "然要百日始熟耳"
  ]) {
    assert.ok(sauce.includes(sourcePhrase), `missing source phrase: ${sourcePhrase}`);
  }
});

test("sauce chapter includes the related sauce methods supplied in the source", () => {
  for (const method of ["肉醬法", "作魚醬法", "作麥醬法", "作榆子醬法", "作蝦醬法", "魚腸醬", "藏蟹法"]) {
    assert.ok(sauce.includes(method), `missing related method: ${method}`);
  }
});
