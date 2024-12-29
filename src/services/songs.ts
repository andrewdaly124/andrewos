// TODO (ada): Error handling here is garbage
import axios, { AxiosResponse } from "axios";

const TRACKS_URL = `https://api.spotify.com/v1/me/tracks`;
const MAX_TRACKS = 50;

export function getNextNTracksRequest(
  token: string,
  limit: number,
  offset: number
) {
  try {
    if (limit < 0 || limit > MAX_TRACKS) {
      throw new Error(
        `Only load 50 tracks at a time, you tried to load: ${limit}`
      );
    }

    const request = axios
      .get(TRACKS_URL, {
        params: {
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        console.error(e.message);
      });

    return request as Promise<
      AxiosResponse<SpotifyApi.UsersSavedTracksResponse>
    >;
  } catch (e) {
    console.warn("Error getting tracks", e);
  }

  return Promise.resolve(null);
}
