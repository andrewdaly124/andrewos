import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closePentrisWindow } from "../../../../store/actions";
import { getPentrisWindowOpen } from "../../../../store/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";

export function PentrisWindow() {
  const dispatch = useDispatch();

  const pentrisWindowOpen = useSelector(getPentrisWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return pentrisWindowOpen ? (
    <Window
      onClose={() => dispatch(closePentrisWindow())}
      title={APP_NAMES.pentris}
      resizable
      hidden={hidden}
      appId="pentris"
    >
      Pentris Goes Here
    </Window>
  ) : null;
}
