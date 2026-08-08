import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

import { chapterById } from "@/data/qimin";

type QiminRequest = {
  action: "science" | "term" | "question";
  chapterId: string;
  messageId?: string;
  term?: string;
  category?: string;
  question?: string;
};

const limits = { science: 160, term: 80, question: 240 } as const;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "尚未配置 OPENAI_API_KEY，请在 .env.local 中配置后重试。" },
      { status: 503 }
    );
  }

  const body = (await request.json()) as QiminRequest;
  const chapter = chapterById(body.chapterId);
  if (!chapter || !["science", "term", "question"].includes(body.action)) {
    return NextResponse.json({ error: "请求内容无效。" }, { status: 400 });
  }

  const fullText = chapter.messages.map((message) => message.original).join("\n");
  let prompt = "";

  if (body.action === "science") {
    const message = chapter.messages.find((item) => item.id === body.messageId);
    if (!message) return NextResponse.json({ error: "找不到这条原文。" }, { status: 400 });
    prompt = `请解释下面这条古代农事经验背后的现代科学道理：\n${message.original}\n要求：100个汉字以内；像懂行的朋友聊天；先说具体机制，再点明古人的观察厉害在哪里；不写论文腔；证据不足时明确说“更可能是”，不要编造。`;
  }

  if (body.action === "term") {
    if (!body.term) return NextResponse.json({ error: "缺少词语。" }, { status: 400 });
    prompt = `在《齐民要术》“${chapter.title}”的语境里，用一句不超过45个汉字的话解释“${body.term}”（类别：${body.category ?? "古代词语"}）。先说这里具体是什么意思；若是度量单位，提醒古今数值会因时代地区而异。不要扩展无关知识。`;
  }

  if (body.action === "question") {
    if (!body.question?.trim()) return NextResponse.json({ error: "问题不能为空。" }, { status: 400 });
    prompt = `你是《齐民要术·活书世界》的导读伙伴。只能根据下方本章原文回答；若原文没有答案，直接说“这一章没讲到”，再指出原文能确认的最近信息，绝不补写史实。语气像博学但接地气的朋友，120字以内。\n\n本章：${chapter.title}\n完整原文：\n${fullText}\n\n读者问：${body.question}`;
  }

  try {
    const result = await generateText({
      model: openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
      prompt,
      maxTokens: limits[body.action],
      temperature: 0.55
    });
    return NextResponse.json({ answer: result.text.trim(), source: "openai" });
  } catch (error) {
    console.error("Qimin AI request failed", error);
    return NextResponse.json({ error: "模型暂时没有回话，请稍后再试。" }, { status: 502 });
  }
}
