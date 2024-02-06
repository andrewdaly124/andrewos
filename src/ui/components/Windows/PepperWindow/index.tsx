import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closePepperWindow } from "../../../../store/actions";
import { getPepperWindowOpen } from "../../../../store/selectors";
import { appNames } from "../../../../types/shortcuts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pepperPng from "../../../../ui/assets/pepper/peppy.png";
import Window from "../../Window";

export default function PepperWindow() {
  const dispatch = useDispatch();

  const pepperWindowOpen = useSelector(getPepperWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return pepperWindowOpen ? (
    <Window
      onClose={() => dispatch(closePepperWindow())}
      title={appNames["pepper-pics"]}
      resizable
      hidden={hidden}
      appId="pepper-pics"
    >
      <img style={{ userSelect: "none" }} src={pepperPng} alt="" />
    </Window>
  ) : null;
}
