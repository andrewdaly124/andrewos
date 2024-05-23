import { decompress } from "lz-string";

import { getLocalStorage } from "../../utils/localStorage";
import { Immutable } from "../../utils/typeUtils";

export const SPOTIFY_STATE_BUCKET = "SPOTIFY_STATE_V1";

export const TRACKS_KEY = "tracks";
export const TRACKS_UPDATED_AT_KEY = "tracks_updated_at";

export const PLAYLISTS_KEY = "playlists";
export const PLAYLISTS_UPDATED_AT_KEY = "playlists_updated_at";

export type SpotifyStoreState = {
  tracks: SpotifyApi.SavedTrackObject[] | null;
  /** ISO date string */
  tracksUpdatedAt: string | null;

  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  /** ISO date string */
  playlistsUpdatedAt: string | null;
};

export type SpotifyStoreActions = {
  tracks: SpotifyApi.SavedTrackObject[] | null;
  /** ISO date string */
  tracksUpdatedAt: string | null;

  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  /** ISO date string */
  playlistsUpdatedAt: string | null;

  setTracks: (tracks: SpotifyApi.SavedTrackObject[]) => void;
  setPlaylists: (playlists: SpotifyApi.PlaylistObjectSimplified[]) => void;
};

function getDecompressedTracks() {
  const compressed = getLocalStorage(TRACKS_KEY, SPOTIFY_STATE_BUCKET);
  if (compressed !== null) {
    return JSON.parse(decompress(compressed)) ?? null;
  }
  return null;
}

export const initialSpotifyStoreState: Immutable<SpotifyStoreState> = {
  tracks: getDecompressedTracks(),
  tracksUpdatedAt: getLocalStorage(TRACKS_UPDATED_AT_KEY, SPOTIFY_STATE_BUCKET),

  playlists: getLocalStorage(PLAYLISTS_KEY, SPOTIFY_STATE_BUCKET),
  playlistsUpdatedAt: getLocalStorage(
    PLAYLISTS_UPDATED_AT_KEY,
    SPOTIFY_STATE_BUCKET
  ),
};
