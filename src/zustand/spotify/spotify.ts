import { compress } from "lz-string";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {} from "@redux-devtools/extension";

import { setLocalStorage } from "../../utils/localStorage";
import { deepCopy } from "../../utils/typeUtils";
import {
  PLAYLISTS_KEY,
  PLAYLISTS_UPDATED_AT_KEY,
  SPOTIFY_STATE_BUCKET,
  SpotifyStoreActions,
  SpotifyStoreState,
  TRACKS_KEY,
  TRACKS_UPDATED_AT_KEY,
  initialSpotifyStoreState,
} from "./types";

export const useSpotifyStore = create<
  SpotifyStoreState & SpotifyStoreActions
>()(
  devtools((set) => ({
    ...deepCopy(initialSpotifyStoreState),

    setTracks: (tracks) =>
      set(() => {
        const newPartialState: Partial<SpotifyStoreState> = {
          tracks: tracks,
          tracksUpdatedAt: new Date().toISOString(),
        };
        setlocalStorageTracks(newPartialState);
        return newPartialState;
      }),

    setPlaylists: (playlists) =>
      set(() => {
        const newPartialState: Partial<SpotifyStoreState> = {
          playlists: playlists,
          playlistsUpdatedAt: new Date().toISOString(),
        };
        setlocalStoragePlaylists(newPartialState);
        return newPartialState;
      }),
  }))
);

function setlocalStorageTracks(state: Partial<SpotifyStoreState>) {
  const { tracks, tracksUpdatedAt } = state;

  const compressedTracks = compress(JSON.stringify(tracks));

  if (tracks && tracksUpdatedAt) {
    setLocalStorage(TRACKS_KEY, compressedTracks, SPOTIFY_STATE_BUCKET);
    setLocalStorage(
      TRACKS_UPDATED_AT_KEY,
      tracksUpdatedAt,
      SPOTIFY_STATE_BUCKET
    );
  }
}

function setlocalStoragePlaylists(state: Partial<SpotifyStoreState>) {
  const { playlists, playlistsUpdatedAt } = state;

  if (playlists && playlistsUpdatedAt) {
    setLocalStorage(PLAYLISTS_KEY, playlists, SPOTIFY_STATE_BUCKET);
    setLocalStorage(
      PLAYLISTS_UPDATED_AT_KEY,
      playlistsUpdatedAt,
      SPOTIFY_STATE_BUCKET
    );
  }
}
