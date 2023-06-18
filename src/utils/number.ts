export function clamp(min: number, val: number, max: number) {
  return Math.max(Math.min(max, val), min);
}
