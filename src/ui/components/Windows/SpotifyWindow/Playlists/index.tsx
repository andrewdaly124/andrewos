import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../redux/selectors";
import { WindowButton } from "../../../WindowButton";

export function Playlists() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const [playlists, setPlaylists] = useState<any[]>([]);

  const populatePlaylists = useCallback(async () => {
    if (spotifyAccessToken !== null) {
      const playlistsUrl = `https://api.spotify.com/v1/me/playlists`;
      try {
        const response = await axios.get(playlistsUrl, {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
  }, [spotifyAccessToken]);

  return (
    <>
      <WindowButton onClick={populatePlaylists}>Get Playlists</WindowButton>{" "}
      {playlists.map((playlist) => (
        <div key={playlist?.id}>{playlist?.name}</div>
      ))}
    </>
  );
}
