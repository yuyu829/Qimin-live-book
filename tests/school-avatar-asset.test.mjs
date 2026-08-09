import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const artReadme = readFileSync(new URL("../public/art/README.md", import.meta.url), "utf8");

test("school heading uses a documented replaceable avatar asset", () => {
  assert.match(page, /src="\/art\/school-cat-avatar\.webp" alt="村口学堂头像" className="school-avatar-image"/);
  assert.match(css, /\.school-avatar-image\{display:block;width:100%;height:100%;object-fit:cover\}/);
  assert.match(artReadme, /`school-cat-avatar\.webp` \| 200 x 200 \| 村口学堂顶部头像/);
  assert.ok(existsSync(new URL("../public/art/school-cat-avatar.webp", import.meta.url)));
});
