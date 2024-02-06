import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";

import { APP_IDS } from "../../../types/shortcuts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import startIcon from "../../assets/img/icon.ico";
import StartTab from "../StartTab";
import styles from "./index.module.scss";

export function StartBar() {
  return (
    <div
      className={styles.startbarContainer}
      // This sucks dude
      style={{ zIndex: `${APP_IDS.length}` }}
    >
      <StartTab
        onClick={() => console.log("click")}
        text="Start"
        imgSrc={startIcon}
      />
      <div className={styles.openTabs}>
        <StartTab
          onClick={() => console.log("click")}
          text="Unusable Tab"
          faIcon={faWindowMaximize}
        />
        <StartTab
          onClick={() => console.log("click")}
          text="Unusable Tab"
          faIcon={faWindowMaximize}
        />
        <StartTab
          onClick={() => console.log("click")}
          text="Unusable Tab"
          faIcon={faWindowMaximize}
        />
        <StartTab
          onClick={() => console.log("click")}
          text="Unusable Tab"
          faIcon={faWindowMaximize}
        />
      </div>
      <div className={styles.filler} />
    </div>
  );
}
