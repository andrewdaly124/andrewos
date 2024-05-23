import { put, takeEvery } from "redux-saga/effects";

import { SPOTIFY_API_BUCKET, getToken, spotifyVerify } from "../../utils/auth";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { loginToSpotify, setSpotifyAccessToken } from "../actions";

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "access_token";

// TODO (ada): can i just make this an async action?
function* spotifyLoginSaga() {
  yield spotifyVerify();
}

/**
 * This is a saga cause the reducers shouldn't do anything except set state baybee
 */
function resetAccessTokenLocalStorage({ payload }: { payload: string | null }) {
  if (payload === null) {
    setLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, null, SPOTIFY_API_BUCKET);
  }
}

// TODO (ada): find out what's happening here to disable that login button
/**
 * This is super dumb
 */
function* initializeSpotifyAccessToken() {
  let accessToken: string | null = getLocalStorage(
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    SPOTIFY_API_BUCKET
  );

  if (accessToken === null) {
    accessToken = yield getToken();
    if (accessToken !== null) {
      setLocalStorage(
        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
        accessToken,
        SPOTIFY_API_BUCKET
      );
    }
  }

  if (accessToken !== null) {
    yield put(setSpotifyAccessToken(accessToken));
  } else {
    console.warn("Couldn't get spotify access token. User hasn't logged in?");
  }
}

export function* api() {
  yield takeEvery(loginToSpotify, spotifyLoginSaga);
  yield takeEvery(setSpotifyAccessToken, resetAccessTokenLocalStorage);

  // initializes store
  yield initializeSpotifyAccessToken();
}
