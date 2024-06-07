import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../../redux/selectors";
import { useSpotifyStore } from "../../../../../../zustand";

const tracksUrl = `https://api.spotify.com/v1/me/tracks`;

// From spotify API
const MAX_TRACKS = 50;

// TODO (ada): yo i can serialize these calls
async function getNextNTracks(token: string, limit: number, offset: number) {
  try {
    if (limit < 0 || limit > MAX_TRACKS) {
      throw new Error(
        `Only load 50 tracks at a time, you tried to load: ${limit}`
      );
    }

    const request = axios.get(tracksUrl, {
      params: {
        limit: limit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return request as Promise<
      AxiosResponse<SpotifyApi.UsersSavedTracksResponse>
    >;
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export function usePopulateSongs() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const setTracks = useSpotifyStore((state) => state.setTracks);

  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numLoaded, setNumLoaded] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState(0);

  const populateSongs = useCallback(async () => {
    let responseTotal: number | null = null;
    const loadedSongs: SpotifyApi.SavedTrackObject[] = [];
    const songsPerRequest = 50;
    let requestedSongs = 0;

    if (spotifyAccessToken !== null) {
      setIsLoading(true);
      const requests: Promise<
        AxiosResponse<SpotifyApi.UsersSavedTracksResponse> | undefined
      >[] = [];

      const handleSongs = (data: SpotifyApi.UsersSavedTracksResponse) => {
        loadedSongs.push(...data.items);
        setNumLoaded(loadedSongs.length);
      };

      while (responseTotal === null || requestedSongs < responseTotal) {
        const request = getNextNTracks(
          spotifyAccessToken,
          songsPerRequest,
          requestedSongs
        );

        if (responseTotal === null) {
          const response = await request;
          if (response?.data !== undefined) {
            requestedSongs += songsPerRequest;
            responseTotal = response.data.total;
            setTotal(response.data.total);
            handleSongs(response.data);
          }
        } else {
          requests.push(request);
          requestedSongs += songsPerRequest;
        }
      }

      Promise.all(requests).then((responses) => {
        for (const response of responses) {
          if (response?.data) {
            handleSongs(response.data);
          }
        }
        setIsLoading(false);
        setTracks(loadedSongs);
      });
    }
  }, [setTracks, spotifyAccessToken]);

  return { populateSongs, loadingSongs: isLoading };
}
