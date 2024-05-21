// Lame, image imports. i dont wanna deal with ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import queenPng from "../ui/assets/img/chess/chessQueenWhite.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import spotifyPng from "../ui/assets/img/spotify.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pepperPng from "../ui/assets/pepper/peppy.png";
import { Immutable } from "../utils/typeUtils";

export const APP_NAMES = {
  "pepper-pics": "Pepper",
  chess: "Info",
  pentris: "Pentris",
  "old-projects": "Old Projects",
  about: "About",
  spotify: "Spotify Stats",
} as const;

export type AppIds = keyof typeof APP_NAMES;

export const APP_IDS = Object.keys(APP_NAMES) as Immutable<AppIds[]>;

export const SHORTCUTS: {
  image: string;
  id: AppIds;
}[] = [
  {
    image: pepperPng,
    id: "pepper-pics",
  },
  {
    image: queenPng,
    id: "chess",
  },
  {
    image: spotifyPng,
    id: "spotify",
  },
];
