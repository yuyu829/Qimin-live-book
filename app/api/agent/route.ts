import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

import { CharacterAgent } from "@/lib/agents/character-agent";
import { LetterReflectionAgent, type ReadingPerspective } from "@/lib/agents/letter-reflection-agent";
import { StreetMemoryAgent } from "@/lib/agents/street-memory-agent";
import { getCharacterById, getLocationById } from "@/lib/memory";

type AgentRequest = {
  agent: "street" | "character" | "letter";
  locationId?: string;
  characterId?: string;
  question?: string;
  letter?: string;
  perspective?: ReadingPerspective;
};

const streetAgent = new StreetMemoryAgent();
const characterAgent = new CharacterAgent();
const letterAgent = new LetterReflectionAgent();

async function aiCharacterResponse(
  question: string,
  characterId: string,
  locationId: string
) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  const character = getCharacterById(characterId);
  const location = getLocationById(locationId);
  if (!character || !location) {
    return null;
  }

  const prompt = `
你是《流俗地：街角记忆博物馆》的 CharacterAgent。
人物：${character.name}
年份：${character.year}
背景：${character.background}
性格：${character.personality}
已知信息边界：${character.known_information.join("；")}
隐藏情绪：${character.hidden_emotion}
说话方式：${character.speech_style}
地点：${location.name}，${location.summary}

规则：
1. 只能知道 ${character.year} 年及以前的信息，不能剧透未来。
2. 回答 80 到 150 个中文字符。
3. 多用生活细节，少用抽象哲理。
4. 克制、真实、含蓄，不制造戏剧化秘密。

用户问题：${question}
`;

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
    maxTokens: 220,
    temperature: 0.65
  });

  return result.text;
}

export async function POST(request: Request) {
  const body = (await request.json()) as AgentRequest;
  const location = body.locationId ? getLocationById(body.locationId) : undefined;
  const character = body.characterId ? getCharacterById(body.characterId) : undefined;

  if (body.agent === "street") {
    return NextResponse.json({
      answer: streetAgent.introduce(location),
      connection: location ? streetAgent.connect(location) : undefined,
      source: "local"
    });
  }

  if (body.agent === "letter") {
    if (!body.letter || !character) {
      return NextResponse.json({ error: "Missing letter or character." }, { status: 400 });
    }

    return NextResponse.json({
      reflection: letterAgent.reflect(
        body.letter,
        character,
        character.year,
        body.perspective ?? "son"
      ),
      source: "local"
    });
  }

  if (body.agent === "character") {
    if (!body.question || !location || !character) {
      return NextResponse.json({ error: "Missing question, location or character." }, { status: 400 });
    }

    const aiAnswer = await aiCharacterResponse(body.question, character.id, location.id);
    if (aiAnswer) {
      return NextResponse.json({ answer: aiAnswer, source: "vercel-ai-sdk" });
    }

    return NextResponse.json({
      answer: characterAgent.respond(character, location, body.question),
      source: "local"
    });
  }

  return NextResponse.json({ error: "Unknown agent." }, { status: 400 });
}
