"use client";

import { Music2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from "./global-bgm.module.css";

const TRACKS = ["/audio/Music1.mp3", "/audio/Music2.mp3"] as const;
const PLAYING_VOLUME = 0.42;
const FADE_DURATION_MS = 3000;
const CROSSFADE_LEAD_SECONDS = 3.4;

export function GlobalBgm() {
  const audioRefs = [useRef<HTMLAudioElement>(null), useRef<HTMLAudioElement>(null)] as const;
  const activeIndex = useRef(0);
  const started = useRef(false);
  const crossfading = useRef(false);
  const animationFrame = useRef<number | undefined>(undefined);
  const mutedRef = useRef(false);
  const startPlayback = useRef<() => void>(() => undefined);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audios = audioRefs.map((ref) => ref.current).filter((audio): audio is HTMLAudioElement => Boolean(audio));
    if (audios.length !== TRACKS.length) return;

    let disposed = false;

    function animateVolumes(from: HTMLAudioElement | undefined, to: HTMLAudioElement, duration: number, onDone?: () => void) {
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      const startedAt = performance.now();
      const fromStart = from?.volume ?? 0;

      const tick = (now: number) => {
        if (disposed) return;
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = progress * progress * (3 - 2 * progress);
        to.volume = PLAYING_VOLUME * eased;
        if (from) from.volume = fromStart * (1 - eased);
        if (progress < 1) animationFrame.current = window.requestAnimationFrame(tick);
        else onDone?.();
      };

      animationFrame.current = window.requestAnimationFrame(tick);
    }

    async function startFirstTrack() {
      if (disposed || started.current) return;
      const first = audios[0];
      first.volume = 0;
      first.muted = mutedRef.current;
      try {
        await first.play();
        started.current = true;
        animateVolumes(undefined, first, FADE_DURATION_MS);
      } catch {
        // Browsers may require the first user gesture before audible playback.
      }
    }

    async function crossfadeToNext() {
      if (disposed || !started.current || crossfading.current) return;
      crossfading.current = true;
      const fromIndex = activeIndex.current;
      const nextIndex = (fromIndex + 1) % audios.length;
      const from = audios[fromIndex];
      const next = audios[nextIndex];
      next.currentTime = 0;
      next.volume = 0;
      next.muted = mutedRef.current;

      try {
        await next.play();
        animateVolumes(from, next, FADE_DURATION_MS, () => {
          from.pause();
          from.currentTime = 0;
          activeIndex.current = nextIndex;
          crossfading.current = false;
        });
      } catch {
        crossfading.current = false;
      }
    }

    function handleTimeUpdate() {
      const current = audios[activeIndex.current];
      if (!Number.isFinite(current.duration)) return;
      if (current.duration - current.currentTime <= CROSSFADE_LEAD_SECONDS) void crossfadeToNext();
    }

    function handleEnded() {
      if (!crossfading.current) void crossfadeToNext();
    }

    function startAfterGesture() {
      void startFirstTrack();
    }

    audios.forEach((audio) => {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
    });
    window.addEventListener("pointerdown", startAfterGesture, { once: true });
    window.addEventListener("keydown", startAfterGesture, { once: true });
    startPlayback.current = () => { void startFirstTrack(); };
    void startFirstTrack();

    return () => {
      disposed = true;
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("pointerdown", startAfterGesture);
      window.removeEventListener("keydown", startAfterGesture);
      audios.forEach((audio) => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
      });
      started.current = false;
      crossfading.current = false;
      startPlayback.current = () => undefined;
    };
  }, []);

  function toggleMuted() {
    const nextMuted = !muted;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    audioRefs.forEach((ref) => {
      if (ref.current) ref.current.muted = nextMuted;
    });
    if (!nextMuted && !started.current) startPlayback.current();
  }

  return (
    <div className={styles.player} aria-label="背景音乐播放器">
      {TRACKS.map((track, index) => <audio key={track} ref={audioRefs[index]} src={track} preload="auto" />)}
      <button type="button" className={styles.toggle} onClick={toggleMuted} aria-label={muted ? "开启背景音乐" : "静音背景音乐"} title={muted ? "开启背景音乐" : "静音背景音乐"}>
        {muted ? <VolumeX size={19} /> : <Music2 size={19} />}
        <span className={muted ? styles.paused : styles.playing} aria-hidden="true" />
      </button>
    </div>
  );
}
