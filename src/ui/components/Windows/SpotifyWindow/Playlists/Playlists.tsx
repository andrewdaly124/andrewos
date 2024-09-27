import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../../../../redux/selectors";
import { SimpleDrawer } from "../../../SimpleDrawer/SimpleDrawer";

const FEELING_LUCKY = true;

export function Playlists() {
  const drawerRef = useRef<ReturnType<typeof SimpleDrawer>>(null);

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
    <SimpleDrawer
      buttonText="Get Playlists"
      onClick={populatePlaylists}
      disableShow={playlists.length === 0}
    >
      {playlists.map((playlist) =>
        FEELING_LUCKY ? (
          <SimpleDrawer
            buttonText={playlist.name}
            onClick={() => console.log(playlistTracks[playlist.id])}
            key={playlist.id}
          >
            {playlistTracks[playlist.id]?.map((track, i) => (
              <div key={track.track.id}>
                {i + 1}. {track.track.artists[0].name} - {track.track.name}
              </div>
            ))}
          </SimpleDrawer>
        ) : (
          <div key={playlist.id}>
            {playlist.name}
            {playlistTracks[playlist.id]?.map((track) => (
              <div key={track.track.id}>
                [{playlist.name}] - {track.track.name}
              </div>
            ))}
          </div>
        )
      )}
    </SimpleDrawer>
  );
}
