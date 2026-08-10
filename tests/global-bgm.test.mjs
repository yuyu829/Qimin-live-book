import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const player = await readFile(new URL("../components/global-bgm.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../components/global-bgm.module.css", import.meta.url), "utf8");

test("root layout owns a single persistent BGM player", () => {
  assert.equal((layout.match(/<GlobalBgm \/>/g) ?? []).length, 1);
  assert.match(layout, /<GlobalBgm \/>\{children\}/);
  assert.doesNotMatch(player, /usePathname|useRouter/);
});

test("two tracks play in order with entry fade and end crossfade", () => {
  assert.match(player, /Music1\.mp3/);
  assert.match(player, /Music2\.mp3/);
  assert.match(player, /nextIndex = \(fromIndex \+ 1\) % audios\.length/);
  assert.match(player, /FADE_DURATION_MS = 3000/);
  assert.match(player, /animateVolumes\(undefined, first, FADE_DURATION_MS\)/);
  assert.match(player, /animateVolumes\(from, next, FADE_DURATION_MS/);
  assert.match(player, /current\.duration - current\.currentTime <= CROSSFADE_LEAD_SECONDS/);
});

test("BGM has a fixed top-right mute control and real audio assets", async () => {
  assert.match(player, /静音背景音乐/);
  assert.match(player, /开启背景音乐/);
  assert.match(styles, /position: fixed/);
  assert.match(styles, /top: 14px/);
  assert.match(styles, /right: max\(14px, calc\(50% - 201px\)\)/);
  assert.match(styles, /\.player \{ top: 10px; right: 10px; \}/);
  await access(new URL("../public/audio/Music1.mp3", import.meta.url));
  await access(new URL("../public/audio/Music2.mp3", import.meta.url));
});

test("autoplay denial falls back to the first user gesture", () => {
  assert.match(player, /window\.addEventListener\("pointerdown", startAfterGesture, \{ once: true \}\)/);
  assert.match(player, /window\.addEventListener\("keydown", startAfterGesture, \{ once: true \}\)/);
  assert.match(player, /void startFirstTrack\(\)/);
});
