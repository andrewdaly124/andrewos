import { APP_IDS } from "../../../types/shortcuts";
import classes from "./index.module.scss";

export function StartBar() {
  return (
    <div
      className={classes.startbarContainer}
      // This sucks dude
      style={{ zIndex: `${APP_IDS.length}` }}
    >
      startbar
    </div>
  );
}
