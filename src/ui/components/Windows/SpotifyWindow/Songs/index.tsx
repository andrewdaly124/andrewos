import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../store/selectors";
import { WindowButton } from "../../../WindowButton";

const tracksUrl = `https://api.spotify.com/v1/me/tracks`;

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
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function Songs() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const [songs, setSongs] = useState<any[]>([]);

  const populateSongs = useCallback(async () => {
    let total: number | null = null;
    const loadedSongs = [];
    if (spotifyAccessToken !== null) {
      while (total === null || loadedSongs.length < total) {
        const data = await getNextNTracks(
          spotifyAccessToken,
          50,
          loadedSongs.length
        );
        if (total === null) {
          total = data.total;
        }
        loadedSongs.push(...data.items);
      }
      setSongs(loadedSongs);
    }
  }, [spotifyAccessToken]);

  return (
    <>
      <WindowButton onClick={populateSongs}>Get Songs</WindowButton>{" "}
      {songs.map((songs, i) => (
        <div key={songs?.track?.id}>
          {i}:{songs?.track?.name}
        </div>
      ))}
    </>
  );
}
