import type { CharacterProfile, LetterReflection } from "@/lib/types";

export type ReadingPerspective = "son" | "parent" | "migrant";

const perspectiveLabels: Record<ReadingPerspective, string> = {
  son: "儿子",
  parent: "父亲",
  migrant: "离乡者"
};

export class LetterReflectionAgent {
  reflect(letter: string, character: CharacterProfile, year: number, perspective: ReadingPerspective): LetterReflection {
    const label = perspectiveLabels[perspective];
    const written = letter
      .split("\n")
      .filter(Boolean)
      .slice(0, 4)
      .join(" ")
      .replace(/\s+/g, " ");

    const unwrittenByPerspective: Record<ReadingPerspective, string> = {
      son: `作为儿子读，这封信最重的地方是「不用担心」。他把手麻、钱少、天气热写得很轻，像怕母亲隔着海也听见他的疲惫。`,
      parent: `作为父亲或长辈读，会看见他努力装成可靠的大人。二十元不只是钱，也是他想证明自己还能照顾家里的方式。`,
      migrant: `作为离乡者读，信里最明显的是分寸。他没有说孤单，也没有说怕，只把辛苦压进「习惯了」三个字里。`
    };

    return {
      written: `信中写下的是报平安、寄钱和叮嘱吃药。${year} 年的${character.name}尽量把生活说得能承受，好让家里觉得他站得住。原文片段：${written}`,
      unwritten: `${unwrittenByPerspective[perspective]}这是克制的推断，不是隐藏的戏剧化秘密。`,
      pressure: `${label}的视角会看见不同压力：海外劳工收入有限，却要同时承担房租、伙食、汇款和家人医疗教育开销。信因此成了安慰家人的工具，也成了他整理自己情绪的地方。`
    };
  }
}
