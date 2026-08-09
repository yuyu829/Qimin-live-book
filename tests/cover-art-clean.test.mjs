import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("cover artwork has no vector fallbacks or colored container", () => {
  const cover = page.match(/function Cover[\s\S]*?function Interest/)?.[0] ?? "";
  assert.match(cover, /src="\/art\/cover-world\.webp"/);
  assert.doesNotMatch(cover, /className="(?:sun|cloud|mountain|field-lines|book-prop|sprout)/);
  assert.doesNotMatch(cover, /<CatMark/);
  assert.match(css, /\.farm-scene\{position:absolute;inset:0;z-index:0;[^}]*background:transparent;pointer-events:none\}/);
});
