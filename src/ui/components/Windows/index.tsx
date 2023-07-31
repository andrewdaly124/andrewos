import AboutWindow from "./AboutWindow";
import ChessWindow from "./ChessWindow";
import OldProjectsWindow from "./OldProjectsWindow";
import PentrisWindow from "./PentrisWindow";
import PepperWindow from "./PepperWindow";

export default function WindowsContainer() {
  return (
    <>
      <PepperWindow />
      <ChessWindow />
      <PentrisWindow />
      <OldProjectsWindow />
      <AboutWindow />
    </>
  );
}
