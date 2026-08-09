import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("blank map areas open a grey coming-soon dialog without hijacking hotspots", () => {
  assert.match(page, /const \[comingSoonOpen, setComingSoonOpen\] = useState\(false\)/);
  assert.match(page, /className="world-map"[^>]*onClick=\{\(\) => setComingSoonOpen\(true\)\}/);
  assert.equal((page.match(/event\.stopPropagation\(\); setVolume\("(?:soybean|sauce)"\)/g) ?? []).length, 2);
  assert.match(page, /comingSoonOpen && <div className="map-coming-soon-backdrop"[\s\S]*<b>敬请期待<\/b>/);
  assert.match(css, /\.map-coming-soon-backdrop\{position:absolute;inset:0;z-index:13;[^}]*background:rgba\(48,48,48,\.38\)/);
  assert.match(css, /\.map-coming-soon-popover\{position:relative;width:min\(190px,72%\);min-height:92px;[^}]*background:rgba\(105,105,105,\.94\)/);
  assert.match(css, /\.map-coming-soon-popover>b\{font:700 18px\/1\.2/);
});
