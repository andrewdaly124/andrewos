import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeChessWindow } from "../../../../redux/actions";
import { getChessWindowOpen } from "../../../../redux/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";

export function ChessWindow() {
  const dispatch = useDispatch();

  const chessWindowOpen = useSelector(getChessWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return chessWindowOpen ? (
    <Window
      onClose={() => dispatch(closeChessWindow())}
      title={APP_NAMES.chess}
      resizable
      hidden={hidden}
      appId="chess"
    >
      This is all custom React!
      <br />
      <br />
      The idea is to make this my website (as opposed to
      <a href="https://andrewdaly.ca/">
        {" "}
        my very old website built quickly with Django
      </a>
      )
      <br />
      <br />
      For now these things out:
      <br />- Moving the icons
      <br />- Resizing and moving the windows
    </Window>
  ) : null;
}
