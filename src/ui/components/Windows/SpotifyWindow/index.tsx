import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSpotifyWindow, loginToSpotify } from "../../../../store/actions";
import {
  getSpotifyAccessToken,
  getSpotifyWindowOpen,
} from "../../../../store/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { Window } from "../../Window";
import { WindowButton } from "../../WindowButton";
import { Playlists } from "./Playlists";
import { Songs } from "./Songs";
import styles from "./index.module.scss";

export function SpotifyWindow() {
  const dispatch = useDispatch();

  const spotifyWindowOpen = useSelector(getSpotifyWindowOpen);
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

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
    >
      <span className={styles.token}>
        {spotifyAccessToken ? `Token: ${spotifyAccessToken}` : "Not logged in!"}
      </span>
      <br />
      <br />
      <WindowButton
        onClick={() => dispatch(loginToSpotify())}
        disabled={spotifyAccessToken !== null}
      >
        Login
      </WindowButton>
      {spotifyAccessToken && (
        <>
          <Playlists />
          <Songs />
        </>
      )}
    </Window>
  ) : null;
}
