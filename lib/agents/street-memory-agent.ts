import { memory } from "@/lib/memory";
import type { MemoryLocation } from "@/lib/types";

export class StreetMemoryAgent {
  introduce(location?: MemoryLocation) {
    if (!location) {
      return memory.project.streetDescription;
    }

    return `${location.name}停在 ${location.year} 年。这里保存的不是大事件，而是${location.fragments[0]} 你可以先看物件，再问人。街区会把这些小声音慢慢接起来。`;
  }

  connect(location: MemoryLocation) {
    const node = memory.timeline.find((item) => item.locationId === location.id);
    return node?.connection ?? "这处记忆还没有完全归档，但它已经和街上的其他声音发生了关系。";
  }

  rhythm(collectedCount: number) {
    if (collectedCount <= 1) {
      return "先不用急着理解整条街。记忆通常从一个杯口、一页账本或一张票根开始。";
    }

    if (collectedCount === 2) {
      return "两段记忆之间已经有了回声：钱、照护、离开，都不是一个人的事。";
    }

    return "三处地点连起来后，这条街不再只是背景。它像一个安静的档案盒，收着几代人的选择。";
  }
}
