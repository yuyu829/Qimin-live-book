export const SWIPE_DISMISS_DISTANCE = 92;

export function shouldDismissCard(deltaX: number) {
  return deltaX >= SWIPE_DISMISS_DISTANCE;
}

export function deckCardTransform(position: number) {
  const depth = Math.min(position, 3);
  const translateY = depth * -34;
  const scale = 1 - depth * 0.055;
  const rotate = depth === 0 ? 0 : depth % 2 === 0 ? 1.2 : -1.2;
  return `translate3d(0, ${translateY}px, ${-depth * 30}px) scale(${scale}) rotate(${rotate}deg)`;
}
