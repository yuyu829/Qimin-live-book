import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const guide = await readFile(new URL("../APP_GUIDE.md", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("app guide contains presentation copy and the complete user journey", () => {
  for (const section of ["一句话简介", "展示用完整介绍", "进入活书世界", "阅读发言卡片", "查看现代科学解释", "继续追问", "完成种芋小游戏", "完成做酱小游戏", "使用地图和图鉴", "村口学堂", "控制背景音乐"]) {
    assert.match(guide, new RegExp(section));
  }
});

test("guide states the current persistence, login and AI boundaries", () => {
  assert.match(guide, /localStorage/);
  assert.match(guide, /\/login.*界面演示/);
  assert.match(guide, /不会创建真实账号/);
  assert.match(guide, /AI 功能需要项目服务端正确配置 API Key/);
});

test("root README links to the app guide", async () => {
  await access(new URL("../APP_GUIDE.md", import.meta.url));
  assert.match(readme, /\[APP_GUIDE\.md\]\(APP_GUIDE\.md\)/);
});
