import { createAction } from "@reduxjs/toolkit";

function apiActionType(type: string) {
  return `API_${type}`;
}

export const setSpotifyAccessToken = createAction<string>(
  apiActionType("set_spotify_access_token")
);

// TODO (ada): is <void> necessary?
export const loginToSpotify = createAction<void>(
  apiActionType("login_to_spotify")
);
