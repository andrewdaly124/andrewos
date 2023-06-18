const COMFORT_BORDER = 4; // px

export type PositionAnchors =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export const WINDOW_BOUNDARIES = {
  bottom: 32 + COMFORT_BORDER,
  top: 0 + COMFORT_BORDER,
  left: 0 + COMFORT_BORDER,
  right: 0 + COMFORT_BORDER,
} as const;
