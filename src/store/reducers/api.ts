import { createReducer } from "@reduxjs/toolkit";

import { deepCopy } from "../../utils/typeUtils";
import { setSpotifyAccessToken } from "../actions";
import { DEFAULT_API_STORE_STATE } from "../types/spotify";

const api = createReducer(deepCopy(DEFAULT_API_STORE_STATE), (builder) => {
  builder.addCase(setSpotifyAccessToken, (state, { payload }) => {
    return { ...state, spotifyAccessToken: payload };
  });
});

export { api };
