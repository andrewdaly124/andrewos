import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../redux/selectors";
import { getNextNTracksRequest } from "../../services/songs";
import { useSpotifyStore } from "../../zustand";

export function usePopulateSongs() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const setTracks = useSpotifyStore((state) => state.setTracks);

  const [isLoading, setIsLoading] = useState(false);
  // TODO (ada): I want progress tracking
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

      const responses: ReturnType<typeof getNextNTracksRequest>[] = [];

      const handleSongs = (data: SpotifyApi.UsersSavedTracksResponse) => {
        loadedSongs.push(...data.items);
        setNumLoaded(loadedSongs.length);
      };

      while (responseTotal === null || requestedSongs < responseTotal) {
        const request = getNextNTracksRequest(
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
          responses.push(request);
          requestedSongs += songsPerRequest;
        }
      }

      Promise.all(responses).then((responses) => {
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

  return { populateSongs, loading: isLoading };
}
