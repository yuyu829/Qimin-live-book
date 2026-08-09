import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { test } from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("top deck card binds pointer gestures", () => {
  assert.match(page, /onPointerDown=\{isTop \? handlePointerDown : undefined\}/);
  assert.match(page, /onPointerMove=\{isTop \? handlePointerMove : undefined\}/);
  assert.match(page, /onPointerUp=\{isTop \? handlePointerUp : undefined\}/);
});

test("deck includes depth transitions and swipe exit animation", () => {
  assert.match(css, /\.deck-card\{[^}]*transition:transform \.38s/);
  assert.match(css, /\.deck-card\.is-dismissing/);
  assert.match(css, /perspective:1000px/);
});

test("deck cards share the compact height measured from each chapter's first card", () => {
  assert.match(css, /\.deck-stage\{[^}]*display:grid/);
  assert.match(page, /const \[deckCardHeight, setDeckCardHeight\] = useState<number>\(\)/);
  assert.match(page, /const firstCardRef = useRef<HTMLDivElement>\(null\)/);
  assert.match(page, /chapter\.id === "sauce" \? taroReferenceCardRef\.current : firstCardRef\.current/);
  assert.match(page, /card\.style\.height = "auto"/);
  assert.match(page, /card\.style\.maxHeight = "none"/);
  assert.match(page, /const naturalHeight = card\.scrollHeight/);
  assert.match(page, /const availableHeight = window\.innerHeight - 282 - 78 - DECK_STACK_RISE/);
  assert.match(page, /Math\.max\(120, Math\.min\(345, naturalHeight \+ 68, availableHeight\)\)/);
  assert.match(page, /ref=\{isTop && currentIndex === 0 \? firstCardRef : undefined\}/);
  assert.match(page, /height: deckCardHeight \? `\$\{deckCardHeight\}px` : undefined/);
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\) \.deck-card\{overflow:hidden/);
  assert.doesNotMatch(css, /\.deck-card\{height:360px;min-height:360px;max-height:360px/);
});

test("deck card content sits five pixels lower without changing card height", () => {
  assert.match(css, /\.deck-card\{[^}]*padding:17px 5px 9px/);
});

test("fifth card starts at the shortcut bar lower edge", () => {
  assert.match(css, /\.reader-page:not\(\.is-full-reader\):not\(\.is-detail-reader\)>\.chat-stream\{position:fixed;top:267px/);
  assert.match(page, /style=\{\{ paddingTop: `\$\{DECK_STACK_RISE\}px` \}\}/);
  assert.match(page, /slice\(currentIndex, currentIndex \+ 5\)/);
});

test("deck still keeps five message slots after removing the scene marker", () => {
  assert.doesNotMatch(page, /deck-date/);
  assert.match(page, /slice\(currentIndex, currentIndex \+ 5\)/);
});

test("swipe hint has its own space below cards and stays within a fixed reader viewport", () => {
  assert.match(css, /\.reader-page\{[^}]*height:100svh[^}]*overflow:hidden/);
  assert.match(css, /\.chat-stream\{position:relative;overflow:visible;height:auto\}/);
  assert.match(css, /\.deck-stage\{[^}]*padding-bottom:46px/);
  assert.match(css, /\.deck-stage\{[^}]*transform:translateY\(-16px\)/);
  assert.match(css, /\.swipe-hint\{[^}]*position:fixed[^}]*bottom:24px[^}]*z-index:39[^}]*white-space:nowrap/);
  assert.match(css, />\.chat-stream\{position:fixed;top:267px;bottom:78px/);
  assert.doesNotMatch(css, /\.swipe-hint\{[^}]*border-radius/);
  assert.match(page, /readerMode === "deck" && currentIndex < chapter\.messages\.length && <div className="swipe-hint">/);
});

test("annotated original terms have a highlighted text style", () => {
  assert.match(css, /\.original-term\{[^}]*font-weight:800/);
});

test("chapter shortcuts show their matching animated cat", () => {
  assert.match(page, /className="reader-shortcuts"/);
  assert.match(page, />阅读全文</);
  assert.match(page, /chapter\.id === "soybean" \? "去种芋" : "去作酱"/);
  assert.match(page, /className="shortcut-cat-animation"/);
  assert.match(page, /chapter\.id === "soybean" \? "\/art\/taro-cat\.gif" : "\/art\/sauce-cat\.gif"/);
  assert.match(page, /chapter\.id === "soybean" \? "种芋动画猫" : "作酱动画猫"/);
  assert.match(css, /\.reader-shortcuts\{position:absolute;top:3px;right:14px/);
  assert.match(css, /\.reader-shortcuts>button\{[^}]*padding:7px 10px[^}]*border-radius:7px[^}]*font-size:12px/);
  assert.match(css, /\.shortcut-cat-animation\{[^}]*width:73px;height:63px[^}]*overflow:hidden/);
  assert.match(css, /\.shortcut-cat-animation img\{[^}]*width:100%;height:100%;object-fit:contain/);
});

test("chapter shortcut cat GIF assets are present", async () => {
  const taro = await stat(new URL("../public/art/taro-cat.gif", import.meta.url));
  const sauce = await stat(new URL("../public/art/sauce-cat.gif", import.meta.url));
  assert.ok(taro.size > 0);
  assert.ok(sauce.size > 0);
});

test("full text shortcut opens the original vertical chat reader", () => {
  assert.match(page, /useState<"deck" \| "full">\("deck"\)/);
  assert.match(page, /onClick=\{\(\) => setReaderMode\("full"\)\}>阅读全文/);
  assert.match(page, /className="full-chat-stream" aria-label="章节全文聊天室"/);
  assert.match(page, /chapter\.messages\.map\(\(message\) =>/);
  assert.doesNotMatch(page, /<header className="reader-header">/);
  assert.match(css, /\.reader-page\.is-full-reader\{[^}]*height:auto[^}]*overflow:visible/);
  assert.match(css, /\.reader-page\.is-full-reader\{[^}]*padding-bottom:0[^}]*overscroll-behavior-y:contain/);
  assert.match(css, /\.is-full-reader \.chat-stream\{padding-top:26px;padding-bottom:86px\}/);
  assert.doesNotMatch(css, /\.is-full-reader \.question-bar\{display:none\}/);
  assert.match(css, /\.full-chat-stream \.animate-message:last-child \.message-row\{margin-bottom:0\}/);
});

test("deck previews long originals while detail keeps the full source", () => {
  assert.match(page, /compact = false/);
  assert.match(page, /message\.translation\.length > 40/);
  assert.match(page, /message\.original\.length > 48/);
  assert.match(page, /compact onSpeaker=\{setSpeaker\}/);
  assert.match(page, /<blockquote>\{message\.original\}<\/blockquote>/);
});

test("card and why action open a structured AI detail page", () => {
  assert.match(page, /function MessageDetail\(/);
  assert.match(page, /onClick=\{onDetail\}/);
  assert.match(page, /event\.stopPropagation\(\); onDetail\?\.\(\)/);
  assert.match(page, /onClick=\{isTop \? \(event\) =>/);
  assert.match(page, /closest\("\.speaker-avatar,\.speaker-name,\.context-rail"\)/);
  assert.match(page, /if \(dragX < 8 && !dismissing\) openDetail\(message\)/);
  assert.match(page, /action: "science", chapterId: chapter\.id, messageId: message\.id/);
  assert.match(page, /action: "term", chapterId: chapter\.id, term: term\.word/);
  assert.match(page, /译文与原文/);
  assert.match(page, /现代科学怎么解释/);
  assert.match(page, /词语小辞典/);
  assert.doesNotMatch(page, /science\.answer \|\| science\.error/);
  assert.match(css, /\.message-detail\{padding:22px 16px 40px\}/);
});
