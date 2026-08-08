"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, MessageCircle, Send, Sparkles } from "lucide-react";

import { markMemoryUnlocked } from "@/components/memory-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { CharacterProfile, LetterReflection, MemoryLocation } from "@/lib/types";

type ChatMessage = {
  role: "user" | "agent";
  text: string;
};

type Perspective = "son" | "parent" | "migrant";

const perspectiveNames: Record<Perspective, string> = {
  son: "作为儿子",
  parent: "作为父亲",
  migrant: "作为离乡者"
};

export function LocationExperience({
  location,
  character
}: {
  location: MemoryLocation;
  character: CharacterProfile;
}) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      text: `${character.name}在这里。你可以问他一件很具体的事，越像生活里的问题，他越能回答。`
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [perspective, setPerspective] = useState<Perspective>("son");
  const [reflection, setReflection] = useState<LetterReflection | null>(null);
  const letter = useMemo(() => location.artifacts.find((item) => item.title === "家书"), [location]);

  useEffect(() => {
    markMemoryUnlocked(location.id);
  }, [location.id]);

  useEffect(() => {
    if (!letter) {
      setReflection(null);
      return;
    }

    async function loadReflection() {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: "letter",
          characterId: character.id,
          letter: letter?.text,
          perspective
        })
      });
      const data = (await response.json()) as { reflection: LetterReflection };
      setReflection(data.reflection);
    }

    loadReflection();
  }, [character.id, letter, perspective]);

  async function askAgent(nextQuestion?: string) {
    const text = (nextQuestion ?? question).trim();
    if (!text || loading) {
      return;
    }

    setQuestion("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", text }]);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: "character",
          locationId: location.id,
          characterId: character.id,
          question: text
        })
      });
      const data = (await response.json()) as { answer: string };
      setMessages((current) => [...current, { role: "agent", text: data.answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "agent", text: "这段记忆暂时有些模糊。你可以换一个更具体的问题再问一次。" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.05fr_0.95fr]">
      <section className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-wood/30 bg-ink/80 shadow-oldstreet">
          <Image
            src={location.visual.image}
            alt={location.visual.caption}
            width={720}
            height={920}
            className="h-[420px] w-full object-cover opacity-90 sepia"
            priority
          />
          <p className="border-t border-paper/20 px-4 py-3 text-sm text-paper/85">
            {location.visual.caption}
          </p>
        </div>
        <div className="rounded-lg border border-wood/25 bg-paper/80 p-4">
          <p className="mb-2 text-sm font-bold text-wood">街区 Agent</p>
          <p className="text-sm leading-7 text-ink/80">{location.summary}</p>
        </div>
      </section>

      <section className="rounded-lg border border-wood/30 bg-paper/85 p-5 shadow-oldstreet">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <Badge variant="warm">{location.year}</Badge>
            <h1 className="mt-3 font-serif text-3xl font-bold text-ink">{location.name}</h1>
            <p className="mt-2 text-sm leading-7 text-wood">{character.background}</p>
          </div>
          <div className="rounded-md bg-oldgreen px-3 py-2 text-sm font-bold text-paper">
            {character.name}
          </div>
        </div>

        <Separator className="mb-5 bg-wood/25" />

        <div className="space-y-4">
          <MemoryBlock title="记忆碎片" items={location.fragments} />
          <MemoryBlock title="时代回声" items={location.echoes} />
        </div>

        <div className="mt-5 space-y-3">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
            <BookOpen className="h-5 w-5 text-warmorange" />
            物件档案
          </h2>
          {location.artifacts.map((artifact) => (
            <div key={artifact.title} className="old-paper rounded-lg border border-wood/25 p-4">
              <p className="mb-2 text-sm font-bold text-wood">{artifact.title}</p>
              <p className="whitespace-pre-wrap text-sm leading-7 text-ink">{artifact.text}</p>
            </div>
          ))}
        </div>

        {letter && reflection ? (
          <div className="mt-5 rounded-lg border border-warmorange/35 bg-[#fff1d7]/80 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
                <Sparkles className="h-5 w-5 text-warmorange" />
                家书 Agent
              </h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(perspectiveNames) as Perspective[]).map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant={perspective === item ? "default" : "outline"}
                    onClick={() => setPerspective(item)}
                  >
                    {perspectiveNames[item]}
                  </Button>
                ))}
              </div>
            </div>
            <ReflectionItem title="信中写下的话" text={reflection.written} />
            <ReflectionItem title="可能没写出口的话" text={reflection.unwritten} />
            <ReflectionItem title="这封信反映的时代压力" text={reflection.pressure} />
          </div>
        ) : null}
      </section>

      <aside className="flex min-h-[620px] flex-col rounded-lg border border-wood/30 bg-[#2f261d]/90 p-4 text-paper shadow-oldstreet">
        <div className="mb-4">
          <p className="text-sm text-paper/65">CharacterAgent</p>
          <h2 className="font-serif text-2xl font-bold">与{character.name}交谈</h2>
          <p className="mt-2 text-sm leading-6 text-paper/70">
            信息边界：只知道 {character.year} 年及以前。
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {location.promptSuggestions.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              size="sm"
              variant="secondary"
              className="h-auto whitespace-normal bg-paper/15 text-left text-paper hover:bg-paper/25"
              onClick={() => askAgent(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-lg px-3 py-2 text-sm leading-7 ${
                message.role === "user"
                  ? "ml-8 bg-warmorange text-paper"
                  : "mr-8 bg-paper/12 text-paper"
              }`}
            >
              {message.text}
            </div>
          ))}
          {loading ? <div className="mr-8 rounded-lg bg-paper/12 px-3 py-2 text-sm">记忆正在整理...</div> : null}
        </div>

        <div className="mt-4 space-y-3">
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="问一个具体问题，例如：你为什么不告诉家人真实情况？"
            className="border-paper/20 bg-paper/10 text-paper placeholder:text-paper/45"
          />
          <Button type="button" className="w-full" onClick={() => askAgent()}>
            <Send className="h-4 w-4" />
            追问这段记忆
          </Button>
        </div>
      </aside>
    </div>
  );
}

function MemoryBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold">
        <MessageCircle className="h-5 w-5 text-warmorange" />
        {title}
      </h2>
      <div className="grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-lg border border-wood/20 bg-[#fff1d7]/70 px-3 py-2 text-sm leading-7 text-ink/85">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function ReflectionItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-t border-warmorange/25 py-3 first:border-t-0 first:pt-0">
      <p className="mb-1 text-sm font-bold text-wood">{title}</p>
      <p className="text-sm leading-7 text-ink/85">{text}</p>
    </div>
  );
}
