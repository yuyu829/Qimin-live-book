import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const prd = await readFile(new URL("../PRD.md", import.meta.url), "utf8");

test("PRD matches the current reading, AI and game release", () => {
  for (const copy of ["V2.0 当前实现版", "卡片堆叠阅读", "science-followup", "16 张卡片科学资料", "种芋小游戏", "做酱小游戏", "qimin-unlocked-cats", "Music1.mp3"]) {
    assert.match(prd, new RegExp(copy.replaceAll(".", "\\.")));
  }
  assert.doesNotMatch(prd, /AI 回答不超过约 100 字/);
  assert.doesNotMatch(prd, /种植、酿造、养殖小游戏。/);
});

test("PRD distinguishes demo login and experimental MCP from production features", () => {
  assert.match(prd, /\/login.*不代表已经接入真实账号、鉴权或云端用户系统/);
  assert.match(prd, /MCP 实验接口/);
  assert.match(prd, /seasonal_farming_advice/);
  assert.match(prd, /book_world_info/);
  assert.match(prd, /不是 App 内主要用户流程/);
});
