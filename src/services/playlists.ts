import axios, { AxiosResponse } from "axios";

const PLAYLISTS_URL = `https://api.spotify.com/v1/me/playlists`;
export async function getMyPlaylistsResponse(token: string) {
  try {
    const response = await axios.get(PLAYLISTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response as AxiosResponse<SpotifyApi.ListOfUsersPlaylistsResponse>;
  } catch (e) {
    console.error("Error getting playlists", e);
  }

  return null;
}

export function getPlaylistTracksRequest(
  /** playlist href */
  url: string,
  token: string
) {
  try {
    const request = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request as Promise<AxiosResponse<SpotifyApi.PlaylistTrackResponse>>;
  } catch (e) {
    console.error("Error getting playlist tracks", e);
  }

  return Promise.resolve(null);
}
