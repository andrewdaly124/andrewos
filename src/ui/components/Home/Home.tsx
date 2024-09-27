import { Shortcuts } from "../Shortcuts";
import { StartBar } from "../StartBar";
import { Windows } from "../Windows";

export function Home() {
  return (
    <>
      <Shortcuts />
      <Windows />
      <StartBar />
    </>
  );
}
