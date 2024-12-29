import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../redux/selectors";
import { getNextNTracksRequest } from "../../services/songs";
import { useSpotifyStore } from "../../zustand";

const RETRY_DELAY = 500;

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
    const SONGS_PER_REQUEST = 50;
    let requestedSongs = 0;

    if (spotifyAccessToken !== null) {
      setIsLoading(true);

      const responses: ReturnType<typeof getNextNTracksRequest>[] = [];

      // Start with one, fill with as many as we need once we know how many songs we have
      const loadedSongChunks: (SpotifyApi.SavedTrackObject[] | null)[] = [null];

      const handleSongs = (
        data: SpotifyApi.UsersSavedTracksResponse,
        index: number
      ) => {
        if (index < loadedSongChunks.length) {
          loadedSongChunks[index] = structuredClone(data.items);
          // TODO (ada): this doesn't work anymore
          setNumLoaded(loadedSongs.length);
        }
      };

      while (responseTotal === null || requestedSongs < responseTotal) {
        const request = getNextNTracksRequest(
          spotifyAccessToken,
          SONGS_PER_REQUEST,
          requestedSongs
        );

        if (responseTotal === null) {
          // Have to get the first one to know how many songs to request
          const response = await request;
          if (response?.data !== undefined) {
            requestedSongs += SONGS_PER_REQUEST;
            responseTotal = response.data.total;
            setTotal(response.data.total);
            handleSongs(response.data, 0);

            for (
              let i = 0;
              // Num needed minus the first one which we've already populated
              i < Math.ceil(responseTotal / SONGS_PER_REQUEST) - 1;
              i++
            ) {
              loadedSongChunks.push(null);
            }
          }
        } else {
          // Then just add the rest to a huge promise list and let them all go at once
          responses.push(request);
          requestedSongs += SONGS_PER_REQUEST;
        }
      }

      await Promise.all(responses).then((responses) => {
        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];

          if (response?.status === 200 && response?.data) {
            handleSongs(response.data, i + 1);
          }
        }
      });

      // Retry failed responses
      while (loadedSongChunks.some((chunk) => chunk === null)) {
        const retriedResponses: ReturnType<typeof getNextNTracksRequest>[] = [];

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

        for (let i = 0; i < loadedSongChunks.length; i++) {
          if (loadedSongChunks[i] === null) {
            const request = getNextNTracksRequest(
              spotifyAccessToken,
              SONGS_PER_REQUEST,
              i * SONGS_PER_REQUEST
            );

            retriedResponses.push(request);
          } else {
            retriedResponses.push(Promise.resolve(null));
          }
        }

        await Promise.all(retriedResponses).then((responses) => {
          for (let i = 0; i < responses.length; i++) {
            const response = responses[i];

            if (response !== null) {
              if (response?.status === 200 && response?.data) {
                handleSongs(response.data, i);
              }
            }
          }
        });
      }

      for (const songChunk of loadedSongChunks) {
        if (songChunk !== null) {
          loadedSongs.push(...songChunk);
        }
      }

      setIsLoading(false);
      setTracks(loadedSongs);
    }
  }, [setTracks, spotifyAccessToken]);

  return { populateSongs, loading: isLoading };
}
