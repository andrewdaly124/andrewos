import ShortcutsContainer from "../Shortcuts";
import { StartBar } from "../StartBar";
import WindowsContainer from "../Windows";

export default function Home() {
  return (
    <div>
      <ShortcutsContainer />
      <WindowsContainer />
      <StartBar />
    </div>
  );
}
