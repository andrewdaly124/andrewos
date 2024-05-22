import { StoreState } from "../types";

export const getLikedTracks = ({ spotify }: StoreState) => spotify.tracks;

export const getTracksUpdatedAt = ({ spotify }: StoreState) =>
  spotify.tracksUpdatedAt;

export const getPlaylists = ({ spotify }: StoreState) => spotify.playlists;

export const getPlaylistsUpdatedAt = ({ spotify }: StoreState) =>
  spotify.playlistsUpdatedAt;
