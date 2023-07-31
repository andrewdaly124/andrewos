import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeAboutWindow,
  closeChessWindow,
  closeOldProjectsWindow,
  closePentrisWindow,
  closePepperWindow,
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
} from "../../../store/actions";
import {
  getAboutWindowOpen,
  getChessWindowOpen,
  getOldProjectsWindowOpen,
  getPentrisWindowOpen,
  getPepperWindowOpen,
} from "../../../store/selectors";
import { ShortcutIds, shortcuts } from "../../../types/shortcuts";
import Shortcut from "../Shortcut";

export default function ShortcutsContainer() {
  const dispatch = useDispatch();

  const pepperWindowOpen = useSelector(getPepperWindowOpen);
  const chessWindowOpen = useSelector(getChessWindowOpen);
  const pentrisWindowOpen = useSelector(getPentrisWindowOpen);
  const oldProjectsWindowOpen = useSelector(getOldProjectsWindowOpen);
  const aboutWindowOpen = useSelector(getAboutWindowOpen);

  const onClickShortcut = useCallback(
    (id: ShortcutIds) => {
      console.log("click", id);
      switch (id) {
        case "pepper-pics":
          console.log(pepperWindowOpen);
          if (pepperWindowOpen) {
            dispatch(closePepperWindow());
          } else {
            dispatch(openPepperWindow());
          }
          break;
        case "chess":
          if (chessWindowOpen) {
            dispatch(closeChessWindow());
          } else {
            dispatch(openChessWindow());
          }
          break;
        case "pentris":
          if (pentrisWindowOpen) {
            dispatch(closePentrisWindow());
          } else {
            dispatch(openPentrisWindow());
          }
          break;
        case "old-projects":
          if (oldProjectsWindowOpen) {
            dispatch(closeOldProjectsWindow());
          } else {
            dispatch(openOldProjectsWindow());
          }
          break;
        case "about":
          if (aboutWindowOpen) {
            dispatch(closeAboutWindow());
          } else {
            dispatch(openAboutWindow());
          }
          break;
        default:
          // need to be exhaustive
          console.error("No onclick behavior for shortcut: ", id);
      }
    },
    [
      aboutWindowOpen,
      chessWindowOpen,
      dispatch,
      oldProjectsWindowOpen,
      pentrisWindowOpen,
      pepperWindowOpen,
    ]
  );

  return (
    <>
      {shortcuts.map((shortcut) => (
        <Shortcut
          image={shortcut.image}
          name={shortcut.name}
          id={shortcut.id}
          key={shortcut.id}
          onClick={() => {
            onClickShortcut(shortcut.id);
          }}
        />
      ))}
    </>
  );
}
