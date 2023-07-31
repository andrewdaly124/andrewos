// Lame, image imports. i dont wanna deal with ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import queenPng from "../ui/assets/img/chess/chessQueenWhite.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pepperPng from "../ui/assets/pepper/peppy.png";

export type ShortcutIds =
  | "pepper-pics"
  | "chess"
  | "pentris"
  | "old-projects"
  | "about";

export const appNames: Record<ShortcutIds, string> = {
  "pepper-pics": "Pepper",
  chess: "Chess",
  pentris: "Pentris",
  "old-projects": "Old Projects",
  about: "About",
};

export const shortcuts: {
  image: string;
  name: string /* can I do typeof? */;
  id: ShortcutIds;
}[] = [
  {
    image: pepperPng,
    name: appNames["pepper-pics"],
    id: "pepper-pics",
  },
  {
    image: queenPng,
    name: appNames.chess,
    id: "chess",
  },
];
