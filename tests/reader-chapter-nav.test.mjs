import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("deck and full-text modes render the chapter navigation before the intro", () => {
  assert.match(page, /<header className="reader-chapter-nav">[\s\S]*<h1 className="reader-chapter-title">\{chapter\.title\}<\/h1>[\s\S]*<\/header>\s*<section className="chapter-intro">/);
});

test("chapter navigation stays fixed at the very top with a centered title", () => {
  assert.match(css, /\.reader-chapter-nav\{position:fixed;top:0;left:50%;transform:translateX\(-50%\);z-index:40;width:min\(100%,430px\);height:58px/);
  assert.match(css, /\.reader-chapter-nav\{[^}]*grid-template-columns:48px 1fr 48px/);
  assert.match(css, /\.reader-chapter-nav h1\{[^}]*text-align:center[^}]*white-space:nowrap/);
});
