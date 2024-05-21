import { StoreState } from "../types";

export const getSpotifyAccessToken = ({ api }: StoreState) =>
  api.spotifyAccessToken;
