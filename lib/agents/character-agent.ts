import type { CharacterProfile, MemoryLocation } from "@/lib/types";

const futurePatterns = [/未来/, /后来/, /2003/, /1988/, /新加坡/, /现在/, /今天/, /几十年后/];

function containsFutureLeak(question: string, character: CharacterProfile) {
  if (character.year >= 2003) {
    return /未来|后来|现在|今天|几十年后/.test(question);
  }

  return futurePatterns.some((pattern) => pattern.test(question));
}

function pickDetail(character: CharacterProfile, seed: string) {
  const score = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return character.life_details[score % character.life_details.length];
}

export class CharacterAgent {
  respond(character: CharacterProfile, location: MemoryLocation, question: string) {
    const detail = pickDetail(character, question);

    if (containsFutureLeak(question, character)) {
      return `我只晓得 ${character.year} 年以前的事。再后来的街会变成怎样，我讲不准。眼前我只记得${location.name}的声音，还有${detail}这些小事。你若问我现在，我只能说，先把今天这一关过好。`;
    }

    if (/为什么|为何|不告诉|真实/.test(question)) {
      return `讲出来也未必有用。家里等着钱，阿母还要吃药，我若写得太苦，她夜里会睡不着。${detail}，这些我自己知道就好。信里写「还好」，不是骗人，是想让他们少担心一点。`;
    }

    if (/最想|回去|舍不得/.test(question)) {
      return `最想回去的不是大地方，是屋后那口井，还有晚饭前有人喊我名字。这里也有熟人，有咖啡味，有工友讲话声，可心里总留一小块给家。${detail}，一想到这些，人就会静下来。`;
    }

    if (/账本|赊账|物价|粮票|汇款/.test(question)) {
      return `账本不是只有数字。谁家这个月药钱重，谁家孩子开学，都会写在那些小小的空格里。${detail}。我不能催得太紧，也不能全不算清楚，日子就是这样一笔一笔撑过去。`;
    }

    if (/离开|留下|如果|没有离开/.test(question)) {
      return `留下不是没胆，离开也不是狠心。只是人到一个时候，会想看看自己还能不能有别的活法。${detail}。若没有走，也许日子会安稳些，可心里那点不甘，未必会自己散掉。`;
    }

    return `这件事我说不大漂亮。${character.year} 年的日子，多半是先顾眼前：饭、工钱、药、车票，还有家里人的脸色。${detail}。你问到这里，我才发现，有些话当时不讲，是因为讲了也怕没人接得住。`;
  }
}
