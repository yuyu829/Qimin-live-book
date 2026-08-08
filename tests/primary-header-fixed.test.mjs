import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("primary screens mark the app shell when the top bar is present", () => {
  assert.match(page, /app-shell \$\{showTopBar \? "has-topbar" : ""\}/);
});

test("primary navigation is fixed to the phone viewport", () => {
  assert.match(css, /\.app-shell\.has-topbar \.topbar\{position:fixed;top:0;left:50%;transform:translateX\(-50%\);width:min\(100%,430px\);height:68px;z-index:40\}/);
});

test("primary screens reserve space for the fixed navigation", () => {
  assert.match(css, /\.app-shell\.has-topbar\{padding-top:68px\}/);
});
