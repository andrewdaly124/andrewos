import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLikedTracks } from "../../../../../store/actions";
import {
  getLikedTracks,
  getSpotifyAccessToken,
} from "../../../../../store/selectors";
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
  const dispatch = useDispatch();

  const spotifyAccessToken = useSelector(getSpotifyAccessToken);
  const tracks = useSelector(getLikedTracks);

  const [isLoading, setIsLoading] = useState(false);
  const [numLoaded, setNumLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  const populateSongs = useCallback(async () => {
    let responseTotal: number | null = null;
    const loadedSongs = [];

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
      dispatch(setLikedTracks(loadedSongs));
    }
  }, [dispatch, spotifyAccessToken]);

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
