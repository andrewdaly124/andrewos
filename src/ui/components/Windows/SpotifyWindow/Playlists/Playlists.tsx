import { useSpotifyStore } from "../../../../../zustand";
import { usePopulatePlaylists } from "../../../../hooks/usePopulatePlaylists";
import { SimpleDrawer } from "../../../SimpleDrawer/SimpleDrawer";

const FEELING_LUCKY = true;

export function Playlists() {
  const { populatePlaylists, loading } = usePopulatePlaylists();

  const playlists = useSpotifyStore((state) => state.playlists);
  const playlistTracks = useSpotifyStore((state) => state.playlistTracks);

  return (
    <SimpleDrawer
      buttonText="Get Playlists"
      onClick={populatePlaylists}
      disableShow={playlists === null || playlists.length === 0}
    >
      {loading && "Loading playlists..."}
      {!loading && playlists !== null && playlistTracks !== null && (
        <PlaylistDrawers
          playlists={playlists}
          playlistTracks={playlistTracks}
        />
      )}
    </SimpleDrawer>
  );
}

type PlaylistDrawersProps = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  playlistTracks: Record<string, SpotifyApi.PlaylistTrackObject[]>;
};

function PlaylistDrawers({ playlists, playlistTracks }: PlaylistDrawersProps) {
  return (
    <>
      {playlists.map((playlist) =>
        FEELING_LUCKY ? (
          <SimpleDrawer
            key={playlist.id}
            buttonText={playlist.name}
            onClick={() => console.log(playlistTracks[playlist.id])}
            openByDefault
          >
            {playlistTracks[playlist.id]?.map(
              // TODO (ada): very shit code
              (track, i) =>
                track.track !== null && (
                  <div
                    // list order will not change, key = i is okay
                    key={i}
                  >
                    {i + 1}. {track.track.artists[0].name} - {track.track.name}
                  </div>
                )
            )}
          </SimpleDrawer>
        ) : (
          <div key={playlist.id}>
            {playlist.name}
            {playlistTracks[playlist.id]?.map(
              // TODO (ada): very shit code here too
              (track, i) =>
                track.track !== null && (
                  <div
                    // list order will not change, key = i is okay
                    key={i}
                  >
                    [{playlist.name}] - {track.track.name}
                  </div>
                )
            )}
          </div>
        )
      )}
    </>
  );
}
