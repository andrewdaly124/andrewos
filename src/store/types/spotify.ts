import { decompress } from "lz-string";

import { getLocalStorage } from "../../utils/localStorage";
import { Immutable } from "../../utils/typeUtils";
import {
  PLAYLISTS_KEY,
  PLAYLISTS_UPDATED_AT_KEY,
  SPOTIFY_STATE_BUCKET,
  TRACKS_KEY,
  TRACKS_UPDATED_AT_KEY,
} from "../sagas/spotify";

export type SpotifyStoreState = {
  tracks: SpotifyApi.SavedTrackObject[] | null;
  /** ISO date string */
  tracksUpdatedAt: string | null;

  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  /** ISO date string */
  playlistsUpdatedAt: string | null;
};

function getDecompressedTracks() {
  const compressed = getLocalStorage(TRACKS_KEY, SPOTIFY_STATE_BUCKET);
  if (compressed !== null) {
    return JSON.parse(decompress(compressed)) ?? null;
  }
  return null;
}

export const DEFAULT_SPOTIFY_STORE_STATE: Immutable<SpotifyStoreState> = {
  tracks: getDecompressedTracks(),
  tracksUpdatedAt: getLocalStorage(TRACKS_UPDATED_AT_KEY, SPOTIFY_STATE_BUCKET),

  playlists: getLocalStorage(PLAYLISTS_KEY, SPOTIFY_STATE_BUCKET),
  playlistsUpdatedAt: getLocalStorage(
    PLAYLISTS_UPDATED_AT_KEY,
    SPOTIFY_STATE_BUCKET
  ),
};
