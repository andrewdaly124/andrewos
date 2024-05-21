import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
  openSpotifyWindow,
} from "../../../store/actions";
import { APP_NAMES, AppIds, SHORTCUTS } from "../../../types/shortcuts";
import { exhaustive } from "../../../utils/typeUtils";
import { Shortcut } from "../Shortcut";

export function Shortcuts() {
  const dispatch = useDispatch();

  const onClickShortcut = useCallback(
    (id: AppIds) => {
      switch (id) {
        case "pepper-pics":
          dispatch(openPepperWindow());
          break;
        case "chess":
          dispatch(openChessWindow());
          break;
        case "pentris":
          dispatch(openPentrisWindow());
          break;
        case "old-projects":
          dispatch(openOldProjectsWindow());
          break;
        case "about":
          dispatch(openAboutWindow());
          break;
        case "spotify":
          dispatch(openSpotifyWindow());
          break;
        default:
          // need to be exhaustive
          exhaustive("No onclick behavior for shortcut", id);
      }
    },
    [dispatch]
  );

  return (
    <>
      {SHORTCUTS.map((shortcut, i) => (
        <Shortcut
          image={shortcut.image}
          name={APP_NAMES[shortcut.id]}
          id={shortcut.id}
          initY={i * (106 + 8)}
          key={shortcut.id}
          onClick={() => {
            onClickShortcut(shortcut.id);
          }}
        />
      ))}
    </>
  );
}
