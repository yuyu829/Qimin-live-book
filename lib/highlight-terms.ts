export type HighlightSegment = { text: string; highlighted: boolean };

export function highlightTerms(text: string, terms: string[]): HighlightSegment[] {
  const ordered = [...new Set(terms.filter(Boolean))].sort((a, b) => b.length - a.length);
  const segments: HighlightSegment[] = [];
  let plain = "";
  let index = 0;

  const flush = () => {
    if (plain) segments.push({ text: plain, highlighted: false });
    plain = "";
  };

  while (index < text.length) {
    const term = ordered.find((candidate) => text.startsWith(candidate, index));
    if (!term) {
      plain += text[index];
      index += 1;
      continue;
    }
    flush();
    segments.push({ text: term, highlighted: true });
    index += term.length;
  }

  flush();
  return segments;
}
