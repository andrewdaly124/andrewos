import Shortcuts from "../Shortcuts";
import { StartBar } from "../StartBar";
import Windows from "../Windows";

export default function Home() {
  return (
    <div>
      <Shortcuts />
      <Windows />
      <StartBar />
    </div>
  );
}
