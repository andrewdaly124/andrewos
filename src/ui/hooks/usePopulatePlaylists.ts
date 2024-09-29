import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { getSpotifyAccessToken } from "../../redux/selectors";
import {
  getMyPlaylistsResponse,
  getPlaylistTracksRequest,
} from "../../services/playlists";
import { useSpotifyStore } from "../../zustand";

export function usePopulatePlaylists() {
  const token = useSelector(getSpotifyAccessToken);

  const [loading, setLoading] = useState(false);

  const setPlaylists = useSpotifyStore((state) => state.setPlaylists);
  const setPlaylistTracks = useSpotifyStore((state) => state.setPlaylistTracks);

  const populatePlaylists = useCallback(async () => {
    if (token !== null) {
      setLoading(true);

      const response = await getMyPlaylistsResponse(token);

      if (response === null) {
        setLoading(false);
        return;
      }

      const responsePlaylists = response.data.items;
      setPlaylists(responsePlaylists);

      const tracksMap: Record<string, SpotifyApi.PlaylistTrackObject[]> = {};

      const responses: ReturnType<typeof getPlaylistTracksRequest>[] = [];
      /** < href, id > */
      const idMap = new Map<string, string>();

      for (const playlist of responsePlaylists) {
        responses.push(getPlaylistTracksRequest(playlist.tracks.href, token));
        idMap.set(playlist.tracks.href, playlist.id);
      }

      Promise.all(responses).then((responses) => {
        for (const response of responses) {
          if (response?.data && response?.config.url) {
            // TODO (ada): idk if i like this
            const id = idMap.get(response?.config.url);
            if (id) {
              tracksMap[id] = response.data.items;
            }
          }
        }
        setLoading(false);
        setPlaylistTracks(tracksMap);
      });
    }
  }, [token]);

  return { populatePlaylists, loading };
}
