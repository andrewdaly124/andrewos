import { useSelector } from "react-redux";

import { getAppZOrder } from "../../../redux/selectors";
import { APP_IDS, AppIds } from "../../../types/shortcuts";
import { AboutWindow } from "./AboutWindow";
import { ChessWindow } from "./ChessWindow";
import { OldProjectsWindow } from "./OldProjectsWindow";
import { PentrisWindow } from "./PentrisWindow";
import { PepperWindow } from "./PepperWindow";
import { SpotifyWindow } from "./SpotifyWindow";
import styles from "./Windows.module.scss";

function WindowContainer({ id }: { id: AppIds }) {
  switch (id) {
    case "pepper-pics":
      return <PepperWindow />;
    case "chess":
      return <ChessWindow />;
    case "pentris":
      return <PentrisWindow />;
    case "old-projects":
      return <OldProjectsWindow />;
    case "about":
      return <AboutWindow />;
    case "spotify":
      return <SpotifyWindow />;
  }
}

export function Windows() {
  const appZOrder = useSelector(getAppZOrder);

  return (
    <>
      {APP_IDS.map((id) => (
        <div
          key={id}
          className={styles.window}
          style={{ zIndex: `${appZOrder.indexOf(id)}` }}
        >
          <WindowContainer id={id} />
        </div>
      ))}
    </>
  );
}
