import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeOldProjectsWindow } from "../../../../store/actions";
import { getOldProjectsWindowOpen } from "../../../../store/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";

export function OldProjectsWindow() {
  const dispatch = useDispatch();

  const oldProjectsWindowOpen = useSelector(getOldProjectsWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return oldProjectsWindowOpen ? (
    <Window
      onClose={() => dispatch(closeOldProjectsWindow())}
      title={APP_NAMES["old-projects"]}
      resizable
      hidden={hidden}
      appId="old-projects"
    >
      Old Projects, should I actually do this
    </Window>
  ) : null;
}
