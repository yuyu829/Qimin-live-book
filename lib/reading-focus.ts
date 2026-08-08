export type MessageRect = {
  index: number;
  top: number;
  bottom: number;
};

export function pickFocusedMessage(rects: MessageRect[], viewportHeight: number) {
  if (rects.length === 0) return -1;

  const readingLine = viewportHeight * 0.46;
  const viewportTop = Math.max(72, viewportHeight * 0.12);
  const viewportBottom = viewportHeight * 0.82;
  const visible = rects.filter((rect) => rect.bottom > viewportTop && rect.top < viewportBottom);
  const candidates = visible.length > 0 ? visible : rects;

  return candidates.reduce((best, rect) => {
    const center = (rect.top + rect.bottom) / 2;
    const bestCenter = (best.top + best.bottom) / 2;
    return Math.abs(center - readingLine) < Math.abs(bestCenter - readingLine) ? rect : best;
  }).index;
}
