export const SWIPE_DISMISS_DISTANCE = 92;
export const DECK_STACK_STEP = 50;
export const DECK_REAR_CARD_COUNT = 4;
export const DECK_STACK_RISE = DECK_STACK_STEP * DECK_REAR_CARD_COUNT;

export function shouldDismissCard(deltaX: number) {
  return deltaX >= SWIPE_DISMISS_DISTANCE;
}

export function deckCardTransform(position: number) {
  const depth = Math.min(position, DECK_REAR_CARD_COUNT);
  const translateY = depth * -DECK_STACK_STEP;
  const scale = 1 - depth * 0.05;
  const rotate = depth === 0 ? 0 : depth % 2 === 0 ? 1.2 : -1.2;
  return `translate3d(0, ${translateY}px, ${-depth * 24}px) scale(${scale}) rotate(${rotate}deg)`;
}
