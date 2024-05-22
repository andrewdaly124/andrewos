import { createReducer } from "@reduxjs/toolkit";

import { deepCopy } from "../../utils/typeUtils";
import { setLikedTracks, setPlaylists } from "../actions";
import { DEFAULT_SPOTIFY_STORE_STATE } from "../types/spotify";

const spotify = createReducer(
  deepCopy(DEFAULT_SPOTIFY_STORE_STATE),
  (builder) => {
    builder
      .addCase(setLikedTracks, (state, { payload }) => {
        return {
          ...state,
          tracks: payload,
          tracksUpdatedAt: new Date().toISOString(),
        };
      })
      .addCase(setPlaylists, (state, { payload }) => {
        return {
          ...state,
          playlists: payload,
          playlistsUpdatedAt: new Date().toISOString(),
        };
      });
  }
);

export { spotify };
