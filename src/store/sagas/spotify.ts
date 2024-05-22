import { compress } from "lz-string";
import { select, takeEvery } from "redux-saga/effects";

import { setLocalStorage } from "../../utils/localStorage";
import { setLikedTracks, setPlaylists } from "../actions";
import {
  getLikedTracks,
  getPlaylists,
  getPlaylistsUpdatedAt,
  getTracksUpdatedAt,
} from "../selectors";

export const SPOTIFY_STATE_BUCKET = "SPOTIFY_STATE_V1";

export const TRACKS_KEY = "tracks";
export const TRACKS_UPDATED_AT_KEY = "tracks_updated_at";

export const PLAYLISTS_KEY = "playlists";
export const PLAYLISTS_UPDATED_AT_KEY = "playlists_updated_at";

function* setlocalStorageTracks() {
  // TODO (ada): why do we have to cast this...
  const tracks: SpotifyApi.SavedTrackObject[] = yield select(getLikedTracks);
  const tracksUpdatedAt: string = yield select(getTracksUpdatedAt);

  const compressedTracks = compress(JSON.stringify(tracks));

  setLocalStorage(TRACKS_KEY, compressedTracks, SPOTIFY_STATE_BUCKET);
  setLocalStorage(TRACKS_UPDATED_AT_KEY, tracksUpdatedAt, SPOTIFY_STATE_BUCKET);
}

function* setlocalStoragePlaylists() {
  // TODO (ada): why do we have to cast this...
  const playlists: SpotifyApi.PlaylistObjectSimplified[] = yield select(
    getPlaylists
  );
  const playlistsUpdatedAt: string = yield select(getPlaylistsUpdatedAt);

  setLocalStorage(PLAYLISTS_KEY, playlists, SPOTIFY_STATE_BUCKET);
  setLocalStorage(
    PLAYLISTS_UPDATED_AT_KEY,
    playlistsUpdatedAt,
    SPOTIFY_STATE_BUCKET
  );
}

export function* spotify() {
  yield takeEvery(setLikedTracks, setlocalStorageTracks);
  yield takeEvery(setPlaylists, setlocalStoragePlaylists);
}
