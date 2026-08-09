"use client";

import { FormEvent, type PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { DECK_STACK_RISE, deckCardTransform, shouldDismissCard } from "@/lib/card-deck";
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
              <ArtImage src={`/art/chapter-${chapter.id}.webp`} alt={`${chapter.title}章节插画`} className="tile-art-image" />
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
      <div className="reading-art-placeholder" aria-label="读书页插画占位"><ArtImage src="/art/reading-world.webp" alt="读书页田园插画" className="reading-art-image" /></div>
      <div className="source-note"><BookOpen size={18} /><p><b>书中有据</b><br />所有文言原文均来自《齐民要术》，AI 只负责解释，不改写原文。</p></div>
    </main>
  );
}

function SpeakerAvatar({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return <button onClick={onClick} className={`speaker-avatar avatar-${speaker.color}`} aria-label={`查看${speaker.name}资料`}><ArtImage src={`/art/avatar-${speaker.id}.webp`} alt="" className="avatar-art" /><span>{speaker.shortName}</span></button>;
}

function MessageBubble({ chapter, message, onSpeaker, onDetail, active, compact = false }: { chapter: Chapter; message: ChapterMessage; onSpeaker: (speaker: Speaker) => void; onDetail?: () => void; active: boolean; compact?: boolean }) {
  const speaker = speakers[message.speakerId];
  const [termStates, setTermStates] = useState<Record<string, AiState>>({});
  const [openTerm, setOpenTerm] = useState<string>();

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

  const isTranslationTruncated = compact && message.translation.length > 40;
  const isOriginalTruncated = compact && message.original.length > 48;
  const displayTranslation = isTranslationTruncated ? `${message.translation.slice(0, 40)}...` : message.translation;
  const displayOriginal = isOriginalTruncated ? message.original.slice(0, 48) : message.original;
  const originalParts = highlightTerms(displayOriginal, message.terms.map((term) => term.word));

  return (
    <div data-message-id={message.id} className={`message-row ${active ? "active-message" : ""}`}>
      <SpeakerAvatar speaker={speaker} onClick={() => onSpeaker(speaker)} />
      <div className="message-column">
        <div className="message-heading">
          <button className="speaker-name" onClick={() => onSpeaker(speaker)}>{speaker.name}<small>{speaker.nature}</small></button>
          <button className="why-button" onClick={(event) => { event.stopPropagation(); onDetail?.(); }}>
            <Sparkles size={14} /> 这是为什么
          </button>
        </div>
        <article className={`paper-bubble ${speaker.id === "proverb" ? "proverb-bubble" : ""}`} onClick={onDetail} role={onDetail ? "button" : undefined} tabIndex={onDetail ? 0 : undefined} onKeyDown={(event) => { if (onDetail && (event.key === "Enter" || event.key === " ")) onDetail(); }}>
          <p className="translation">{displayTranslation}</p>
          <div className="original-block">
            <p>
              {originalParts.map((part, index) => part.highlighted ? <strong className="original-term" key={`${part.text}-${index}`}>{part.text}</strong> : <span key={`${part.text}-${index}`}>{part.text}</span>)}
            </p>
            {isOriginalTruncated && <div className="compact-read-more-row"><button className="compact-read-more" onClick={(event) => { event.stopPropagation(); onDetail?.(); }}>阅读全文</button></div>}
          </div>
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

function MessageDetail({ chapter, message, onBack }: { chapter: Chapter; message: ChapterMessage; onBack: () => void }) {
  const [science, setScience] = useState<AiState>({ loading: true });
  const [terms, setTerms] = useState<Record<string, AiState>>({});

  useEffect(() => {
    let active = true;
    setScience({ loading: true });
    setTerms(Object.fromEntries(message.terms.map((term) => [term.word, { loading: true }])));
    askAi({ action: "science", chapterId: chapter.id, messageId: message.id })
      .then((answer) => active && setScience({ answer }))
      .catch((error) => active && setScience({ error: (error as Error).message }));
    message.terms.forEach((term) => {
      askAi({ action: "term", chapterId: chapter.id, term: term.word, category: term.category })
        .then((answer) => active && setTerms((state) => ({ ...state, [term.word]: { answer } })))
        .catch((error) => active && setTerms((state) => ({ ...state, [term.word]: { error: (error as Error).message } })));
    });
    return () => { active = false; };
  }, [chapter.id, message]);

  return (
    <section className="message-detail" aria-label="单条发言详情">
      <button className="detail-back" onClick={onBack}><ArrowLeft size={16} /> 返回阅读</button>
      <div className="detail-text"><p className="overline">译文与原文</p><h2>{message.translation}</h2><blockquote>{message.original}</blockquote></div>
      <div className="detail-science"><p className="overline">现代科学怎么解释</p><div><Sparkles size={19} /><p>{science.loading ? "正在请教现代科学…" : science.answer ?? science.error}</p></div></div>
      <div className="detail-terms"><p className="overline">词语小辞典</p>{message.terms.length ? message.terms.map((term) => <article key={term.word}><b>{term.word}</b><small>{term.category}</small><p>{terms[term.word]?.loading ? "正在查古今词典…" : terms[term.word]?.answer ?? terms[term.word]?.error}</p></article>) : <p className="detail-empty">这条原文没有需要额外解释的词语。</p>}</div>
    </section>
  );
}

function Reader({ chapter, onBack, onComplete }: { chapter: Chapter; onBack: () => void; onComplete: () => void }) {
  const [readerMode, setReaderMode] = useState<"deck" | "full" | "detail">("deck");
  const [detailReturnMode, setDetailReturnMode] = useState<"deck" | "full">("deck");
  const [detailMessage, setDetailMessage] = useState<ChapterMessage>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaker, setSpeaker] = useState<Speaker>();
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<{ question: string; answer?: string; error?: string }[]>([]);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [deckCardHeight, setDeckCardHeight] = useState<number>();
  const pointerStart = useRef({ x: 0, active: false });
  const firstCardRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setReaderMode("deck"); setCurrentIndex(0); setDragX(0); setDragging(false); setDismissing(false); setConversation([]); setQuestion(""); }, [chapter.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [conversation]);

  useLayoutEffect(() => {
    const card = firstCardRef.current;
    if (!card) return;
    card.style.height = "auto";
    card.style.minHeight = "0";
    card.style.maxHeight = "none";
    const naturalHeight = card.scrollHeight;
    const availableHeight = window.innerHeight - 282 - 78 - DECK_STACK_RISE;
    setDeckCardHeight(Math.max(120, Math.min(370, naturalHeight + 68, availableHeight)));
  }, [chapter.id]);

  function openDetail(message: ChapterMessage) {
    setDetailReturnMode(readerMode === "full" ? "full" : "deck");
    setDetailMessage(message);
    setReaderMode("detail");
    window.scrollTo(0, 0);
  }

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
    <main className={`reader-page ${readerMode === "full" ? "is-full-reader" : ""} ${readerMode === "detail" ? "is-detail-reader" : ""}`}>
      {readerMode === "detail" && detailMessage ? <MessageDetail chapter={chapter} message={detailMessage} onBack={() => setReaderMode(detailReturnMode)} /> : <>
      <header className="reader-chapter-nav">
        <button
          type="button"
          className="reader-back-button"
          aria-label={readerMode === "full" ? "返回卡片阅读" : "返回章节列表"}
          onClick={readerMode === "full" ? () => setReaderMode("deck") : onBack}
        >
          <ArrowLeft size={18} />
        </button>
        <h1>{chapter.title}</h1>
        <span aria-hidden="true" />
      </header>
      <section className="chapter-intro">
        <div><p>今天他们在聊</p><h2>{chapter.question}</h2><span>{chapter.intro}</span></div>
      </section>
      {readerMode === "deck" && <div className="reader-shortcuts" aria-label="章节快捷操作">
          <button type="button" onClick={() => setReaderMode("full")}>阅读全文</button>
          <button type="button">{chapter.id === "soybean" ? "去种芋" : "去晒酱"}</button>
          <span className="shortcut-cat-placeholder" aria-label="动画小猫占位"><CatMark small /></span>
      </div>}
      <section className="chat-stream">
        {readerMode === "full" && (
          <div className="full-chat-stream" aria-label="章节全文聊天室">
            {chapter.messages.map((message) => (
              <div className="animate-message" key={message.id}>
                <MessageBubble chapter={chapter} message={message} active onSpeaker={setSpeaker} onDetail={() => openDetail(message)} />
              </div>
            ))}
          </div>
        )}
        {readerMode === "deck" && currentIndex < chapter.messages.length && (
          <div className="deck-stage" aria-label="章节发言卡片堆" style={{ paddingTop: `${DECK_STACK_RISE}px` }}>
            {chapter.messages.slice(currentIndex, currentIndex + 5).map((message, position) => {
              const isTop = position === 0;
              const topTransform = `translate3d(${dragX}px, 0, 0) rotate(${Math.min(dragX / 18, 16)}deg)`;
              return (
                <div
                  key={message.id}
                  ref={isTop && currentIndex === 0 ? firstCardRef : undefined}
                  className={`deck-card deck-position-${position} ${isTop ? "is-top" : ""} ${isTop && dismissing ? "is-dismissing" : ""}`}
                  data-deck-position={position}
                  style={{
                    zIndex: 20 - position,
                    opacity: isTop && dismissing ? 0 : 1 - position * 0.12,
                    filter: position === 0 ? "none" : `saturate(${1 - position * 0.16}) blur(${position * 0.15}px)`,
                    transform: isTop ? topTransform : deckCardTransform(position),
                    transition: isTop && dragging ? "none" : undefined,
                    height: deckCardHeight ? `${deckCardHeight}px` : undefined,
                    minHeight: deckCardHeight ? `${deckCardHeight}px` : undefined,
                    maxHeight: deckCardHeight ? `${deckCardHeight}px` : undefined
                  }}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerUp : undefined}
                  onClick={isTop ? (event) => {
                    if ((event.target as HTMLElement).closest(".speaker-avatar,.speaker-name,.context-rail")) return;
                    if (dragX < 8 && !dismissing) openDetail(message);
                  } : undefined}
                >
                  <MessageBubble chapter={chapter} message={message} active={isTop} compact onSpeaker={setSpeaker} onDetail={isTop ? () => { if (dragX < 8 && !dismissing) openDetail(message); } : undefined} />
                </div>
              );
            })}
          </div>
        )}
        {readerMode === "deck" && <div className="swipe-hint"><ArrowRight size={15} /> 按住卡片向右滑，听下一位发言</div>}
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
      </>}
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

const mapVolumes = {
  soybean: { title: "卷二", items: ["黍穀第四", "粱秫第五", "大豆第六", "小豆第七", "种麻第八", "种麻子第九", "大小麦第十 翟麦附", "水稻第十一", "旱稻第十二", "胡麻第十三", "种瓜第十四 茄子附", "种瓠第十五", "种芋第十六"] },
  sauce: { title: "卷八", items: ["黄衣、黄蒸及蘖第六十八 黄衣一名麦奴", "常满盐、花盐第六十九", "作酱等法第七十", "作酢法第七十一", "作豉法第七十二", "八和齑 初稽反 第七十三", "作鱼鲊第七十四", "脯腊第七十五", "羹臛法第七十六", "蒸缹 方九切 法第七十七", "[月正]、腊、煎、消法第七十八", "菹绿第七十九"] }
} as const;

const pouchCats = [
  ["芋头喵", "map-cat-taro.webp"], ["做酱喵", "map-cat-sauce.webp"], ["辣椒喵", "map-cat-chili.webp"],
  ["养鸡喵", "map-cat-chicken.webp"], ["种树喵", "map-cat-tree.webp"], ["种饼喵", "map-cat-cake.webp"],
  ["种枣喵", "map-cat-jujube.webp"], ["种柿喵", "map-cat-persimmon.webp"], ["养鱼喵", "map-cat-fish.webp"]
] as const;

function WorldMap({ onOpen }: { onOpen: (id: Chapter["id"]) => void }) {
  const [volume, setVolume] = useState<"soybean" | "sauce">();
  const [pouchOpen, setPouchOpen] = useState(false);
  return (
    <main className="map-page">
      <div className="world-map" data-map-coordinate-space="853x1844">
        <ArtImage src="/art/world-map.webp" alt="齐民村田园绘本地图" className="custom-art world-map-art" />
        <svg className="map-hotspots" viewBox="0 0 853 1844" preserveAspectRatio="xMidYMin slice" aria-label="齐民村地点">
          <rect className="map-hotspot" x="306" y="304" width="242" height="242" role="button" tabIndex={0} aria-label="打开种植卷目录" onClick={() => setVolume("soybean")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setVolume("soybean"); }} />
          <rect className="map-hotspot" x="20" y="868" width="242" height="242" role="button" tabIndex={0} aria-label="打开酿造卷目录" onClick={() => setVolume("sauce")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setVolume("sauce"); }} />
        </svg>
      </div>
      <div className="map-profile" aria-label="小禾喵等级 Lv2 小学徒"><div className="map-profile-avatar"><ArtImage src="/art/map-cat-avatar.webp" alt="小禾喵头像" className="map-profile-image" /></div><div className="map-profile-info"><b>小禾喵</b><span>Lv2&nbsp; 小学徒</span><div className="map-level-track" role="progressbar" aria-label="升级进度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={46}><i /></div></div></div>
      <button className="map-pouch-button" type="button" aria-label="打开图鉴" onClick={() => setPouchOpen(true)}><ArtImage src="/art/map-pouch.webp" alt="图鉴" className="map-pouch-image" /><span aria-hidden="true">图鉴</span></button>
      {pouchOpen && <div className="pouch-backdrop" onClick={() => setPouchOpen(false)}><section className="pouch-popover" onClick={(event) => event.stopPropagation()}><button className="map-volume-close" onClick={() => setPouchOpen(false)} aria-label="关闭图鉴"><X /></button><p className="overline">齐民村 · 农活喵图鉴</p><h2>我的图鉴</h2><div className="pouch-grid">{pouchCats.map(([name, image]) => <article className="pouch-cat" key={name}><div className="pouch-cat-art"><ArtImage src={`/art/${image}`} alt={`${name}插画占位`} className="pouch-cat-image" /></div><b>{name}</b></article>)}</div></section></div>}
      {volume && <div className="map-volume-backdrop" onClick={() => setVolume(undefined)}><section className="map-volume-popover" onClick={(event) => event.stopPropagation()}><button className="map-volume-close" onClick={() => setVolume(undefined)} aria-label="关闭卷目录"><X /></button><p className="overline">齐民要术 · 章节目录</p><h2>{mapVolumes[volume].title}</h2><div className="map-volume-list">{mapVolumes[volume].items.map((item, index) => <button key={item} disabled={index !== (volume === "soybean" ? 2 : 2)} onClick={() => onOpen(volume)}>{item}{index === 2 && <ChevronRight size={15} />}</button>)}</div></section></div>}
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
      <button className="school-return-link" onClick={onBack} aria-label="回齐民村">
        <span className="school-return-icon"><ArrowLeft size={18} /></span>
        <span>回齐民村</span>
      </button>
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

  const showTopBar = ["recommend", "map", "school"].includes(screen);
  return (
    <div className={`app-shell ${showTopBar ? "has-topbar" : ""} ${screen === "map" ? "map-screen" : ""} ${screen === "recommend" ? "reading-screen" : ""} ${screen === "school" ? "school-screen" : ""}`}>
      {showTopBar && <TopBar readCount={readIds.length} onHome={() => setScreen("cover")} />}
      {screen === "cover" && <Cover onNext={() => setScreen("interest")} />}
      {screen === "interest" && <Interest selected={interest} setSelected={setInterest} onNext={() => setScreen("recommend")} />}
      {screen === "recommend" && <Recommendations onOpen={openChapter} />}
      {screen === "reader" && <Reader chapter={chapter} onBack={() => setScreen("recommend")} onComplete={completeChapter} />}
      {screen === "map" && <WorldMap onOpen={openChapter} />}
      {screen === "school" && <School notes={notes} setNotes={setNotes} onBack={() => setScreen("map")} />}
      {showTopBar && <nav className="bottom-nav">
        <button className={screen === "recommend" ? "active" : ""} onClick={() => setScreen("recommend")}><BookOpen /><span>读书</span></button>
        <button className={screen === "map" ? "active" : ""} onClick={() => setScreen("map")}><MapIcon /><span>地图</span></button>
        <button className={screen === "school" ? "active" : ""} onClick={() => setScreen("school")}><GraduationCap /><span>学堂</span></button>
      </nav>}
    </div>
  );
}
