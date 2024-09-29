import { compress } from "lz-string";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {} from "@redux-devtools/extension";

import { setLocalStorage } from "../../utils/localStorage";
import { deepCopy } from "../../utils/typeUtils";
import {
  PLAYLISTS_KEY,
  PLAYLISTS_UPDATED_AT_KEY,
  PLAYLIST_TRACKS_KEY,
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
  immer(
    devtools((set) => ({
      ...deepCopy(initialSpotifyStoreState),

      setTracks: (tracks) =>
        set((state) => {
          state.tracks = tracks;
          state.tracksUpdatedAt = new Date().toISOString();
          setlocalStorageTracks(state);
        }),

      setPlaylists: (playlists) =>
        set((state) => {
          state.playlists = playlists;
          state.playlistsUpdatedAt = new Date().toISOString();
          setlocalStoragePlaylists(state);
        }),

      setPlaylistTracks: (trackMap) =>
        set((state) => {
          state.playlistTracks = trackMap;
          state.playlistsUpdatedAt = new Date().toISOString();
          setlocalStoragePlaylistTracks(state);
        }),
    }))
  )
);

// TODO (ada): move these elsewhere and type them right
// TODO (ada): make these more generic
function setlocalStorageTracks(state: Partial<SpotifyStoreState>) {
  const { tracks, tracksUpdatedAt } = state;

  if (tracks && tracksUpdatedAt) {
    const compressed = compress(JSON.stringify(tracks));

    setLocalStorage(TRACKS_KEY, compressed, SPOTIFY_STATE_BUCKET);
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

function setlocalStoragePlaylistTracks(state: Partial<SpotifyStoreState>) {
  const { playlistTracks, playlistsUpdatedAt } = state;

  if (playlistTracks && playlistsUpdatedAt) {
    const compressed = compress(JSON.stringify(playlistTracks));

    setLocalStorage(PLAYLIST_TRACKS_KEY, compressed, SPOTIFY_STATE_BUCKET);
    setLocalStorage(
      PLAYLISTS_UPDATED_AT_KEY,
      playlistsUpdatedAt,
      SPOTIFY_STATE_BUCKET
    );
  }
}
