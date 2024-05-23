import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../redux/selectors";
import { useSpotifyStore } from "../../../../../zustand";
import { WindowButton } from "../../../WindowButton";

const tracksUrl = `https://api.spotify.com/v1/me/tracks`;

// TODO (ada): yo i can serialize these calls
async function getNextNTracks(token: string, limit: number, offset: number) {
  try {
    const response = await axios.get(tracksUrl, {
      params: {
        limit: Math.max(0, Math.min(50, limit)),
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as SpotifyApi.UsersSavedTracksResponse;
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export function Songs() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const tracks = useSpotifyStore((state) => state.tracks);
  const setTracks = useSpotifyStore((state) => state.setTracks);

  const [isLoading, setIsLoading] = useState(false);
  const [numLoaded, setNumLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  const populateSongs = useCallback(async () => {
    let responseTotal: number | null = null;
    const loadedSongs: SpotifyApi.SavedTrackObject[] = [];

    if (spotifyAccessToken !== null) {
      setIsLoading(true);
      while (responseTotal === null || loadedSongs.length < responseTotal) {
        const data = await getNextNTracks(
          spotifyAccessToken,
          50,
          loadedSongs.length
        );
        if (data !== undefined) {
          if (responseTotal === null) {
            responseTotal = data.total;
            setTotal(data.total);
          }
          loadedSongs.push(...data.items);
          setNumLoaded(loadedSongs.length);
        }
      }
      setIsLoading(false);
      setTracks(loadedSongs);
    }
  }, [setTracks, spotifyAccessToken]);

  return (
    <>
      <WindowButton onClick={populateSongs}>Get Songs</WindowButton>
      {isLoading && `Loading... (${numLoaded}/${total || "???"})`}
      {tracks &&
        tracks.map((track, i) => (
          <div key={track.track.id}>
            {i}:{track.track.name}
          </div>
        ))}
    </>
  );
}
