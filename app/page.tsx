"use client";

import { FormEvent, type PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Home,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Map as MapIcon,
  MessageCircleMore,
  Send,
  Sparkles,
  Sprout,
  Sun,
  Wheat,
  X
} from "lucide-react";

import { chapterById, chapters, speakers, type Chapter, type ChapterMessage, type Speaker, type Term } from "@/data/qimin";
import { deckCardTransform, shouldDismissCard } from "@/lib/card-deck";
import { highlightTerms } from "@/lib/highlight-terms";

type Screen = "cover" | "interest" | "recommend" | "reader" | "map" | "school";
type AiState = { loading?: boolean; answer?: string; error?: string };
type Note = { id: number; text: string; time: string };

const starterNotes: Note[] = [
  { id: 1, text: "淘米水别急着倒，放凉后浇绿萝，算是给厨房剩余找个去处。", time: "今天" },
  { id: 2, text: "晒酱不是只靠太阳，雨后那一次搅拌也很要紧。", time: "昨天" }
];

async function askAi(payload: Record<string, string>) {
  const response = await fetch("/api/qimin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = (await response.json()) as { answer?: string; error?: string };
  if (!response.ok || !data.answer) throw new Error(data.error ?? "没有收到回答。");
  return data.answer;
}

function CatMark({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "cat-mark cat-mark-small" : "cat-mark"} aria-hidden="true">
      <span className="cat-ear cat-ear-left" /><span className="cat-ear cat-ear-right" />
      <span className="cat-face"><i /><i /><b /></span>
      {!small && <span className="cat-paw">古</span>}
    </div>
  );
}

function ArtImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <img src={src} alt={alt} className={className} onError={(event) => { event.currentTarget.style.display = "none"; }} />;
}

function ProgressPill({ readCount }: { readCount: number }) {
  return (
    <div className="progress-pill" aria-label={`已读 ${readCount}/2 章节`}>
      <BookOpen size={15} />
      <span>{readCount === 0 ? "田间学徒" : readCount === 1 ? "识农新手" : "齐民行家"}</span>
      <b>{readCount}/2</b>
    </div>
  );
}

function TopBar({ readCount, onHome }: { readCount: number; onHome: () => void }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="返回封面">
        <CatMark small /><span><b>齐民要术</b><small>活书世界</small></span>
      </button>
      <ProgressPill readCount={readCount} />
    </header>
  );
}

function Cover({ onNext }: { onNext: () => void }) {
  return (
    <main className="cover-screen">
      <div className="cover-copy">
        <div className="eyebrow"><span /> 北魏 · 贾思勰 <span /></div>
        <h1>齐民要术<small>活书世界</small></h1>
        <p className="cover-kicker">两千年前的生活妙招博主，<br />今天重新开麦。</p>
        <button className="primary-button" onClick={onNext}>翻开这本活书 <ArrowRight size={18} /></button>
        <p className="cover-note"><Sparkles size={14} /> 5 分钟，听懂一条老祖宗的门道</p>
      </div>
      <div className="farm-scene" aria-label="田野里的小猫和古书插画">
        <ArtImage src="/art/cover-world.webp" alt="齐民要术田园绘本封面" className="custom-art cover-art" />
        <div className="sun"><span /><span /><span /><span /></div>
        <div className="cloud cloud-a" /><div className="cloud cloud-b" />
        <div className="mountain mountain-a" /><div className="mountain mountain-b" />
        <div className="field-lines" />
        <div className="book-prop"><span>齐<br />民<br />要<br />术</span></div>
        <CatMark />
        <div className="sprout s1">♧</div><div className="sprout s2">♧</div><div className="sprout s3">♧</div>
      </div>
      <div className="scroll-cue">向下翻一页 <span>↓</span></div>
    </main>
  );
}

function Interest({ selected, setSelected, onNext }: { selected: string; setSelected: (value: string) => void; onNext: () => void }) {
  const choices = [
    { id: "plant", icon: <Sprout />, title: "种点东西", text: "阳台种菜、养花、育苗" },
    { id: "food", icon: <FlaskConical />, title: "厨房门道", text: "发酵、保存、做得更香" },
    { id: "why", icon: <Sparkles />, title: "冷知识溯源", text: "这招到底是哪儿来的" }
  ];
  return (
    <main className="step-screen narrow-page">
      <div className="step-count">壹 <span /> 贰</div>
      <p className="overline">先认识一下</p>
      <h2>你平时容易停在哪类<br />生活妙招前？</h2>
      <p className="subcopy">随手选一个，看看古书里的人会聊起什么。</p>
      <div className="choice-list">
        {choices.map((choice) => (
          <button key={choice.id} className={`choice-row ${selected === choice.id ? "selected" : ""}`} onClick={() => setSelected(choice.id)}>
            <span className="choice-icon">{choice.icon}</span><span><b>{choice.title}</b><small>{choice.text}</small></span>
            <i>{selected === choice.id && <Check size={15} />}</i>
          </button>
        ))}
      </div>
      <button disabled={!selected} className="primary-button full-button" onClick={onNext}>看看为你翻到哪一页 <ArrowRight size={18} /></button>
      <p className="privacy-note">这次选择只用来开启 Demo，不会上传或保存。</p>
    </main>
  );
}

function Recommendations({ onOpen }: { onOpen: (id: Chapter["id"]) => void }) {
  return (
    <main className="step-screen recommend-page">
      <div className="recommend-heading">
        <p className="overline">书页已经翻到了</p>
        <h2>两场古人的现场讨论</h2>
        <p className="subcopy">选一个坐进去。你会听见旧农书、民间谚语和贾思勰轮流发言。</p>
      </div>
      <div className="chapter-grid">
        {chapters.map((chapter, index) => (
          <article key={chapter.id} className={`chapter-tile tile-${chapter.id}`}>
            <div className="tile-art">
              {chapter.id === "soybean" ? <><Sun /><Sprout /><span className="soil-dots">•••</span></> : <><span className="jar">酱</span><Sun /><span className="wood-spoon" /></>}
              <span className="chapter-number">0{index + 1}</span>
            </div>
            <div className="tile-body">
              <div className="tile-meta"><span>{chapter.category}篇</span><span>{chapter.volume}</span><span>{chapter.messages.length} 位发言</span></div>
              <h3>{chapter.title}</h3>
              <p>{chapter.question}</p>
              <button className="text-button" onClick={() => onOpen(chapter.id)}>进入讨论 <ChevronRight size={17} /></button>
            </div>
          </article>
        ))}
      </div>
      <div className="source-note"><BookOpen size={18} /><p><b>书中有据</b><br />所有文言原文均来自《齐民要术》，AI 只负责解释，不改写原文。</p></div>
    </main>
  );
}

function SpeakerAvatar({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return <button onClick={onClick} className={`speaker-avatar avatar-${speaker.color}`} aria-label={`查看${speaker.name}资料`}><ArtImage src={`/art/avatar-${speaker.id}.webp`} alt="" className="avatar-art" /><span>{speaker.shortName}</span></button>;
}

function MessageBubble({ chapter, message, onSpeaker, active }: { chapter: Chapter; message: ChapterMessage; onSpeaker: (speaker: Speaker) => void; active: boolean }) {
  const speaker = speakers[message.speakerId];
  const [science, setScience] = useState<AiState>({});
  const [termStates, setTermStates] = useState<Record<string, AiState>>({});
  const [openTerm, setOpenTerm] = useState<string>();

  async function explainScience() {
    setScience({ loading: true });
    try {
      const answer = await askAi({ action: "science", chapterId: chapter.id, messageId: message.id });
      setScience({ answer });
    } catch (error) { setScience({ error: (error as Error).message }); }
  }

  async function explainTerm(term: Term) {
    setOpenTerm(term.word);
    if (termStates[term.word]?.answer || termStates[term.word]?.loading) return;
    setTermStates((state) => ({ ...state, [term.word]: { loading: true } }));
    try {
      const answer = await askAi({ action: "term", chapterId: chapter.id, term: term.word, category: term.category });
      setTermStates((state) => ({ ...state, [term.word]: { answer } }));
    } catch (error) {
      setTermStates((state) => ({ ...state, [term.word]: { error: (error as Error).message } }));
    }
  }

  const originalParts = highlightTerms(message.original, message.terms.map((term) => term.word));

  return (
    <div data-message-id={message.id} className={`message-row ${active ? "active-message" : ""}`}>
      <SpeakerAvatar speaker={speaker} onClick={() => onSpeaker(speaker)} />
      <div className="message-column">
        <button className="speaker-name" onClick={() => onSpeaker(speaker)}>{speaker.name}<small>{speaker.nature}</small></button>
        <article className={`paper-bubble ${speaker.id === "proverb" ? "proverb-bubble" : ""}`}>
          <p className="translation">{message.translation}</p>
          <div className="original-block">
            <p>{originalParts.map((part, index) => part.highlighted ? <strong className="original-term" key={`${part.text}-${index}`}>{part.text}</strong> : <span key={`${part.text}-${index}`}>{part.text}</span>)}</p>
            <div className="term-row">
              <button disabled={science.loading} className="why-button" onClick={explainScience}>
                {science.loading ? <LoaderCircle className="spin" size={14} /> : <Sparkles size={14} />} 这是为什么
              </button>
            </div>
          </div>
          {(science.answer || science.error) && (
            <div className={`science-answer ${science.error ? "error-answer" : ""}`}>
              <span><Sparkles size={16} /></span><div><b>{science.error ? "还没连上先生" : "现代人接话"}</b><p>{science.answer ?? science.error}</p></div>
            </div>
          )}
        </article>
      </div>
      {message.terms.length > 0 && (
        <aside className="context-rail" aria-label="这段原文的上下文工具">
          {message.terms.slice(0, 3).map((term, index) => (
            <div className={`rail-term rail-term-${index}`} key={term.word}>
              <button onClick={() => explainTerm(term)}><span>{term.word}</span><b>?</b></button>
              {openTerm === term.word && (
                <div className="term-popover">
                  <button onClick={() => setOpenTerm(undefined)} aria-label="关闭"><X size={13} /></button>
                  <b>{term.word}</b><small>{term.category}</small>
                  <p>{termStates[term.word]?.loading ? <><LoaderCircle className="spin" size={14} /> 正在问古今词典…</> : termStates[term.word]?.answer ?? termStates[term.word]?.error}</p>
                </div>
              )}
            </div>
          ))}
        </aside>
      )}
    </div>
  );
}

function Reader({ chapter, onBack, onComplete }: { chapter: Chapter; onBack: () => void; onComplete: () => void }) {
  const [readerMode, setReaderMode] = useState<"deck" | "full">("deck");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaker, setSpeaker] = useState<Speaker>();
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<{ question: string; answer?: string; error?: string }[]>([]);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const pointerStart = useRef({ x: 0, active: false });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setReaderMode("deck"); setCurrentIndex(0); setDragX(0); setDragging(false); setDismissing(false); setConversation([]); setQuestion(""); }, [chapter.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [conversation]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button, input, a")) return;
    pointerStart.current = { x: event.clientX, active: true };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointerStart.current.active || dismissing) return;
    setDragX(Math.max(0, event.clientX - pointerStart.current.x));
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointerStart.current.active || dismissing) return;
    pointerStart.current.active = false;
    setDragging(false);
    if (!shouldDismissCard(dragX)) {
      setDragX(0);
      return;
    }
    setDismissing(true);
    setDragX(Math.max(window.innerWidth, 520));
    window.setTimeout(() => {
      setCurrentIndex((index) => Math.min(index + 1, chapter.messages.length));
      setDragX(0);
      setDismissing(false);
    }, 360);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  async function submitQuestion(event: FormEvent) {
    event.preventDefault();
    const text = question.trim(); if (!text) return;
    setQuestion(""); setConversation((items) => [...items, { question: text }]);
    try {
      const answer = await askAi({ action: "question", chapterId: chapter.id, question: text });
      setConversation((items) => items.map((item, i) => i === items.length - 1 ? { ...item, answer } : item));
    } catch (error) {
      setConversation((items) => items.map((item, i) => i === items.length - 1 ? { ...item, error: (error as Error).message } : item));
    }
  }

  return (
    <main className={`reader-page ${readerMode === "full" ? "is-full-reader" : ""}`}>
      <header className="reader-header">
        <button className="icon-button" onClick={readerMode === "full" ? () => setReaderMode("deck") : onBack} aria-label={readerMode === "full" ? "返回卡片阅读" : "返回推荐"}><ArrowLeft /></button>
        <div><span>{chapter.category}篇 · {chapter.volume}</span><h1>{chapter.title}</h1></div>
        <div className="reader-count">{readerMode === "full" ? "全文" : `${Math.min(currentIndex + 1, chapter.messages.length)}/${chapter.messages.length}`}</div>
      </header>
      <section className="chapter-intro">
        <div className="chapter-symbol"><ArtImage src={`/art/chapter-${chapter.id}.webp`} alt="" className="chapter-art" />{chapter.id === "soybean" ? <Sprout /> : <FlaskConical />}</div>
        <div><p>今天他们在聊</p><h2>{chapter.question}</h2><span>{chapter.intro}</span></div>
      </section>
      <section className="chat-stream">
        {readerMode === "deck" && <div className="reader-shortcuts" aria-label="章节快捷操作">
          <button type="button" onClick={() => setReaderMode("full")}>阅读全文</button>
          <button type="button">{chapter.id === "soybean" ? "去种豆" : "去晒酱"}</button>
          <span className="shortcut-cat-placeholder" aria-label="动画小猫占位"><CatMark small /></span>
        </div>}
        {readerMode === "full" && (
          <div className="full-chat-stream" aria-label="章节全文聊天室">
            {chapter.messages.map((message) => (
              <div className="animate-message" key={message.id}>
                <MessageBubble chapter={chapter} message={message} active onSpeaker={setSpeaker} />
              </div>
            ))}
          </div>
        )}
        {readerMode === "deck" && currentIndex < chapter.messages.length && (
          <div className="deck-stage" aria-label="章节发言卡片堆">
            {chapter.messages.slice(currentIndex, currentIndex + 5).map((message, position) => {
              const isTop = position === 0;
              const topTransform = `translate3d(${dragX}px, 0, 0) rotate(${Math.min(dragX / 18, 16)}deg)`;
              return (
                <div
                  key={message.id}
                  className={`deck-card deck-position-${position} ${isTop ? "is-top" : ""} ${isTop && dismissing ? "is-dismissing" : ""}`}
                  data-deck-position={position}
                  style={{
                    zIndex: 20 - position,
                    opacity: isTop && dismissing ? 0 : 1 - position * 0.12,
                    filter: position === 0 ? "none" : `saturate(${1 - position * 0.16}) blur(${position * 0.15}px)`,
                    transform: isTop ? topTransform : deckCardTransform(position),
                    transition: isTop && dragging ? "none" : undefined
                  }}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerUp : undefined}
                >
                  <MessageBubble chapter={chapter} message={message} active={isTop} onSpeaker={setSpeaker} />
                </div>
              );
            })}
            <div className="swipe-hint"><ArrowRight size={15} /> 按住卡片向右滑，听下一位发言</div>
          </div>
        )}
        {conversation.map((item, index) => (
          <div className="qa-exchange" key={`${item.question}-${index}`}>
            <div className="user-question">你问：{item.question}</div>
            <div className="guide-answer"><CatMark small /><div><b>书页向导</b><p>{item.answer ?? item.error ?? <><LoaderCircle className="spin" size={15} /> 正在对照本章原文…</>}</p></div></div>
          </div>
        ))}
        {readerMode === "deck" && currentIndex === chapter.messages.length && (
          <div className="chapter-finish">
            <Wheat /><p><b>这一页读到这里</b><br />你已经听完 {chapter.messages.length} 条书中发言</p>
            <button onClick={onComplete}>收起书页，去地图 <MapIcon size={17} /></button>
          </div>
        )}
        <div ref={bottomRef} />
      </section>
      <form className="question-bar" onSubmit={submitQuestion}>
        <div className="question-inner"><MessageCircleMore /><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="问问这章里的事…" aria-label="向书页提问" /><button disabled={!question.trim()} aria-label="发送"><Send /></button></div>
        <small>向导只根据当前章节原文回答</small>
      </form>
      {speaker && (
        <div className="modal-backdrop" onClick={() => setSpeaker(undefined)}>
          <aside className="speaker-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setSpeaker(undefined)}><X /></button>
            <SpeakerAvatar speaker={speaker} onClick={() => undefined} />
            <p className="overline">这位发言人是</p><h3>{speaker.name}</h3><span className="speaker-era">{speaker.era}</span>
            <p>{speaker.bio}</p>
            <dl><div><dt>作者 / 来源</dt><dd>{speaker.author}</dd></div><div><dt>本段性质</dt><dd>{speaker.nature}</dd></div></dl>
          </aside>
        </div>
      )}
    </main>
  );
}

function WorldMap({ readIds, onOpen, onSchool }: { readIds: string[]; onOpen: (id: Chapter["id"]) => void; onSchool: () => void }) {
  const locked = ["果园", "水利", "花圃", "家园"];
  return (
    <main className="map-page">
      <div className="map-heading"><p className="overline">齐民村 · 晴</p><h2>今天去哪里转转？</h2><p>读过的地方会在地图上留下印记。</p></div>
      <div className="world-map">
        <ArtImage src="/art/world-map.webp" alt="齐民村田园绘本地图" className="custom-art world-map-art" />
        <div className="map-river" />
        <button className="place place-farm" onClick={() => onOpen("soybean")}><span className="place-art"><Sprout /></span><b>种植</b><small>{readIds.includes("soybean") ? "已读完 ✓" : "去听一章"}</small></button>
        <button className="place place-brew" onClick={() => onOpen("sauce")}><span className="place-art"><FlaskConical /></span><b>酿造</b><small>{readIds.includes("sauce") ? "已读完 ✓" : "去听一章"}</small></button>
        <button className="place place-school" onClick={onSchool}><span className="place-art"><GraduationCap /></span><b>学堂</b><small>经验留言墙</small></button>
        {locked.map((name, i) => <div key={name} className={`place locked-place locked-${i}`}><span className="place-art"><LockKeyhole /></span><b>{name}</b><small>敬请期待</small></div>)}
        <div className="map-cloud c1" /><div className="map-cloud c2" />
      </div>
      {readIds.length > 0 && <div className="level-banner"><span><Sparkles /></span><p><b>{readIds.length === 2 ? "齐民行家" : "识农新手"}</b><br />{readIds.length === 2 ? "两章都已收入你的农学手账" : "读完第一章，新的身份已经记下"}</p><strong>{readIds.length}/2</strong></div>}
    </main>
  );
}

function School({ notes, setNotes, onBack }: { notes: Note[]; setNotes: (notes: Note[]) => void; onBack: () => void }) {
  const [text, setText] = useState("");
  function publish(event: FormEvent) {
    event.preventDefault(); const value = text.trim(); if (!value) return;
    setNotes([{ id: Date.now(), text: value.slice(0, 80), time: "刚刚" }, ...notes]); setText("");
  }
  return (
    <main className="school-page narrow-page">
      <button className="back-link" onClick={onBack}><ArrowLeft /> 回齐民村</button>
      <div className="school-heading"><span><GraduationCap /></span><p className="overline">村口学堂</p><h2>把你的生活门道<br />留在墙上</h2><p>一句就好。这里不比分数，只把亲手试过的经验传下去。</p></div>
      <form className="note-form" onSubmit={publish}><textarea maxLength={80} value={text} onChange={(e) => setText(e.target.value)} placeholder="比如：给塑料瓶扎几个小孔，用来慢慢浇花…" /><div><span>{text.length}/80</span><button disabled={!text.trim()}>贴上墙 <Send size={15} /></button></div></form>
      <div className="note-wall">{notes.map((note, index) => <article key={note.id} className={`wall-note note-${index % 3}`}><span>经验笺 · {note.time}</span><p>{note.text}</p><small>—— 齐民村路过的人</small></article>)}</div>
    </main>
  );
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("cover");
  const [interest, setInterest] = useState("");
  const [chapterId, setChapterId] = useState<Chapter["id"]>("soybean");
  const [readIds, setReadIds] = useState<string[]>([]);
  const [notes, setNotesState] = useState<Note[]>(starterNotes);
  const chapter = useMemo(() => chapterById(chapterId)!, [chapterId]);

  useEffect(() => {
    try {
      setReadIds(JSON.parse(localStorage.getItem("qimin-read") ?? "[]"));
      setNotesState(JSON.parse(localStorage.getItem("qimin-notes") ?? JSON.stringify(starterNotes)));
    } catch { /* ignore malformed demo state */ }
  }, []);

  function openChapter(id: Chapter["id"]) { setChapterId(id); setScreen("reader"); window.scrollTo(0, 0); }
  function completeChapter() {
    const next = Array.from(new Set([...readIds, chapterId])); setReadIds(next); localStorage.setItem("qimin-read", JSON.stringify(next)); setScreen("map"); window.scrollTo(0, 0);
  }
  function setNotes(next: Note[]) { setNotesState(next); localStorage.setItem("qimin-notes", JSON.stringify(next)); }

  const showTopBar = !["cover", "reader"].includes(screen);
  return (
    <div className={`app-shell ${showTopBar ? "has-topbar" : ""}`}>
      {showTopBar && <TopBar readCount={readIds.length} onHome={() => setScreen("cover")} />}
      {screen === "cover" && <Cover onNext={() => setScreen("interest")} />}
      {screen === "interest" && <Interest selected={interest} setSelected={setInterest} onNext={() => setScreen("recommend")} />}
      {screen === "recommend" && <Recommendations onOpen={openChapter} />}
      {screen === "reader" && <Reader chapter={chapter} onBack={() => setScreen("recommend")} onComplete={completeChapter} />}
      {screen === "map" && <WorldMap readIds={readIds} onOpen={openChapter} onSchool={() => setScreen("school")} />}
      {screen === "school" && <School notes={notes} setNotes={setNotes} onBack={() => setScreen("map")} />}
      {showTopBar && <nav className="bottom-nav">
        <button className={screen === "recommend" ? "active" : ""} onClick={() => setScreen("recommend")}><BookOpen /><span>读书</span></button>
        <button className={screen === "map" ? "active" : ""} onClick={() => setScreen("map")}><MapIcon /><span>地图</span></button>
        <button className={screen === "school" ? "active" : ""} onClick={() => setScreen("school")}><GraduationCap /><span>学堂</span></button>
      </nav>}
    </div>
  );
}
