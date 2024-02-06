import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
} from "../../../store/actions";
import { AppIds, SHORTCUTS } from "../../../types/shortcuts";
import Shortcut from "../Shortcut";

export default function Shortcuts() {
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
        default:
          // need to be exhaustive
          console.error("No onclick behavior for shortcut: ", id);
      }
    },
    [dispatch]
  );

  return (
    <>
      {SHORTCUTS.map((shortcut, i) => (
        <Shortcut
          image={shortcut.image}
          name={shortcut.name}
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
