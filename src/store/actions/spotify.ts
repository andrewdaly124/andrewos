import { createAction } from "@reduxjs/toolkit";

function spotifyActionType(type: string) {
  return `SPOTIFY_${type}`;
}

export const setLikedTracks = createAction<SpotifyApi.SavedTrackObject[]>(
  spotifyActionType("set_liked_tracks")
);

export const setPlaylists = createAction<SpotifyApi.PlaylistObjectSimplified[]>(
  spotifyActionType("set_playlists")
);
