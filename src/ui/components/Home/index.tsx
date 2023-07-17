// Lame, image imports. i dont wanna deal with ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import queenPng from "../../assets/img/chess/chessQueenWhite.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pepperPng from "../../assets/pepper/peppy.png";
import Shortcut from "../Shortcut";
import { StartBar } from "../StartBar";
import Window from "../Window";

export default function Home() {
  return (
    <div>
      <Shortcut
        image={pepperPng}
        name="Pepper Pics"
        id="pepper-pics"
        onClick={() => console.log("open")}
      />
      <Shortcut
        image={queenPng}
        name="Chess"
        id="chess"
        onClick={() => console.log("open")}
      />
      <Window
        onClose={() => {}}
        title="peppers window"
        resizable
        closed={false}
        minimized={false}
      >
        Poop
      </Window>
      <StartBar />
    </div>
  );
}
