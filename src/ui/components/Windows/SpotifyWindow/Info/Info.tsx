import { useDispatch, useSelector } from "react-redux";

import { loginToSpotify } from "../../../../../redux/actions";
import { getSpotifyAccessToken } from "../../../../../redux/selectors";
import { WindowButton } from "../../../WindowButton";
import styles from "./Info.module.scss";

export function Info() {
  const dispatch = useDispatch();

  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  return (
    <>
      <span className={styles.token}>
        {spotifyAccessToken ? `Token: ${spotifyAccessToken}` : "Not logged in!"}
      </span>
      <WindowButton onClick={() => dispatch(loginToSpotify())}>
        Login
      </WindowButton>
    </>
  );
}
