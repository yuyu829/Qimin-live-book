"use client";

import { Archive } from "lucide-react";

import { useUnlockedMemories } from "@/components/memory-counter";

export function TimelineUnlocks() {
  const unlocked = useUnlockedMemories();

  return (
    <div className="rounded-lg border border-oldgreen/30 bg-oldgreen/15 p-4 text-oldgreen">
      <div className="flex items-center gap-3">
        <Archive className="h-5 w-5" />
        <p className="font-bold">当前已解锁 {unlocked.length} / 3 个记忆节点</p>
      </div>
      <p className="mt-2 text-sm leading-7">
        {unlocked.length === 0
          ? "先进入街区地图，点击任一地点开始归档。"
          : "继续探索未点亮的地点，时间轴会逐渐从散落物件变成一段街区情感史。"}
      </p>
    </div>
  );
}
