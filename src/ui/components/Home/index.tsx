// Lame, image imports. i dont wanna deal with ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pepperPng from "../../assets/pepper/peppy.png";
import Shortcut from "../Shortcut";
import { StartBar } from "../StartBar";

export default function Home() {
  return (
    <div>
      <Shortcut
        image={pepperPng}
        name="Pepper"
        id="pepper-pics"
        onClick={() => console.log("open")}
      />
      <Shortcut
        image={pepperPng}
        name="Pepper"
        id="pepper-pics"
        onClick={() => console.log("open")}
      />
      <StartBar />
    </div>
  );
}
