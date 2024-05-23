import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeAboutWindow } from "../../../../redux/actions";
import { getAboutWindowOpen } from "../../../../redux/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";

export function AboutWindow() {
  const dispatch = useDispatch();

  const aboutWindowOpen = useSelector(getAboutWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return aboutWindowOpen ? (
    <Window
      onClose={() => dispatch(closeAboutWindow())}
      title={APP_NAMES.about}
      resizable
      hidden={hidden}
      appId="about"
    ></Window>
  ) : null;
}
