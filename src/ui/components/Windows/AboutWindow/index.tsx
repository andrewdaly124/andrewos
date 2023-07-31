import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeAboutWindow } from "../../../../store/actions";
import { getAboutWindowOpen } from "../../../../store/selectors";
import { appNames } from "../../../../types/shortcuts";
import Window from "../../Window";

export default function AboutWindow() {
  const dispatch = useDispatch();

  const aboutWindowOpen = useSelector(getAboutWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return aboutWindowOpen ? (
    <Window
      onClose={() => dispatch(closeAboutWindow())}
      title={appNames.about}
      resizable
      hidden={hidden}
    >
      Poop
    </Window>
  ) : null;
}
