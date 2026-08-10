import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

import { chapterById } from "@/data/qimin";
import { scienceContextForMessages, scienceEvidenceFor } from "@/data/science-evidence";
import { buildQiminPrompt, QIMIN_SYSTEM_PROMPT, type QiminAction } from "@/lib/qimin-prompts";

type QiminRequest = {
  action: QiminAction;
  chapterId: string;
  messageId?: string;
  term?: string;
  category?: string;
  question?: string;
};

// Reasoning models may spend part of this budget before producing visible text.
// The prompts still enforce the much shorter user-facing answer lengths.
const limits = { science: 2048, term: 768, question: 2048 } as const;

const qiminAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1"
});

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

  let prompt = "";

  if (body.action === "science") {
    const message = chapter.messages.find((item) => item.id === body.messageId);
    if (!message) return NextResponse.json({ error: "找不到这条原文。" }, { status: 400 });
    const evidence = scienceEvidenceFor(message.id);
    if (evidence?.explanation) {
      return NextResponse.json({ answer: evidence.explanation, source: "curated", sources: evidence.sources });
    }
    prompt = buildQiminPrompt({ action: body.action, chapter, message, evidence, sources: evidence?.sources });
  }

  if (body.action === "term") {
    const term = body.term?.trim().slice(0, 30);
    if (!term) return NextResponse.json({ error: "缺少词语。" }, { status: 400 });
    prompt = buildQiminPrompt({ action: body.action, chapter, term, category: body.category?.slice(0, 30) });
  }

  if (body.action === "question") {
    const question = body.question?.trim().slice(0, 300);
    if (!question) return NextResponse.json({ error: "问题不能为空。" }, { status: 400 });
    prompt = buildQiminPrompt({
      action: body.action,
      chapter,
      question,
      chapterScienceContext: scienceContextForMessages(chapter.messages.map((message) => message.id))
    });
  }

  try {
    const result = await generateText({
      model: qiminAI(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
      system: QIMIN_SYSTEM_PROMPT,
      prompt,
      maxTokens: limits[body.action],
      temperature: 0.55
    });
    const answer = result.text.trim();
    if (!answer) return NextResponse.json({ error: "教书先生刚才走神了，请再问一次。" }, { status: 502 });
    const evidence = body.action === "science" && body.messageId ? scienceEvidenceFor(body.messageId) : undefined;
    return NextResponse.json({ answer, source: "openai", sources: evidence?.sources ?? [] });
  } catch (error) {
    console.error("Qimin AI request failed", error);
    return NextResponse.json({ error: "模型暂时没有回话，请稍后再试。" }, { status: 502 });
  }
}
