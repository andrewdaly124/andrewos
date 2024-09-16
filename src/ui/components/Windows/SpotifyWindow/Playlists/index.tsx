import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../redux/selectors";
import { WindowButton } from "../../../WindowButton";

export function Playlists() {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [playlistTracks, setPlaylistTracks] = useState<
    Record<string, SpotifyApi.SavedTrackObject[]>
  >({});

  const populatePlaylists = useCallback(async () => {
    if (spotifyAccessToken !== null) {
      const playlistsUrl = `https://api.spotify.com/v1/me/playlists`;
      try {
        const response = await axios.get(playlistsUrl, {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        });
        const responsePlaylists: SpotifyApi.PlaylistObjectSimplified[] =
          response.data.items;

        setPlaylists(responsePlaylists);

        const tracksMap: Record<string, SpotifyApi.SavedTrackObject[]> = {};

        for (const rp of responsePlaylists) {
          try {
            const tracksResponse = await axios.get(rp.tracks.href, {
              headers: {
                Authorization: `Bearer ${spotifyAccessToken}`,
              },
            });
            tracksMap[rp.id] = tracksResponse.data.items;
          } catch (error) {
            console.error("on get tracks from playlist", error);
          }
        }

        setPlaylistTracks(tracksMap);
      } catch (error) {
        console.log(error);
      }
    }
  }, [spotifyAccessToken]);

  console.log(playlistTracks);

  return (
    <>
      <WindowButton onClick={populatePlaylists}>Get Playlists</WindowButton>{" "}
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          {playlist.name}
          {playlistTracks[playlist.id]?.map((track) => (
            <div key={track.track.id}> - {track.track.name} </div>
          ))}
        </div>
      ))}
    </>
  );
}
