import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSpotifyWindow } from "../../../../store/actions";
import { getSpotifyWindowOpen } from "../../../../store/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";

export function SpotifyWindow() {
  const dispatch = useDispatch();

  const spotifyWindowOpen = useSelector(getSpotifyWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return spotifyWindowOpen ? (
    <Window
      onClose={() => dispatch(closeSpotifyWindow())}
      title={APP_NAMES.spotify}
      resizable
      hidden={hidden}
      appId="spotify"
    ></Window>
  ) : null;
}
