import { useState } from "react";

import { useSpotifyStore } from "../../../../../zustand";
import { usePopulateSongs } from "../../../../hooks/usePopulateSongs";
import { Dropdown, ListItem } from "../../../Dropdown";
import { SimpleDrawer } from "../../../SimpleDrawer";

const SORT_KEYS = [
  "track",
  "artist",
  "album",
  "added",
  "release",
  "length",
] as const;
type SongsSort = (typeof SORT_KEYS)[number];

const SORT_OPTIONS: Record<SongsSort, string> = {
  track: "Track Name",
  artist: "Artist Name",
  album: "Album Name",
  release: "Release Date",
  added: "Date Added",
  length: "Track Length",
};

const SORT_OPTIONS_ARR = (() => {
  const arr: ListItem[] = [];
  for (const key of SORT_KEYS) {
    arr.push({ key: key, label: SORT_OPTIONS[key] });
  }
  return arr;
})();

export function Songs() {
  const tracks = useSpotifyStore((state) => state.tracks);

  const { populateSongs, loading } = usePopulateSongs();

  const sortType = useState<SongsSort>("track");

  return (
    <SimpleDrawer buttonText="Get Songs" onClick={populateSongs}>
      <Dropdown
        onSelect={(key) => console.log(key)}
        options={SORT_OPTIONS_ARR}
      />
      {loading && "Loading songs..."}
      {!loading &&
        tracks &&
        tracks.map((track, i) => (
          <div key={track.track.id}>
            {i}:{track.track.name}
          </div>
        ))}
    </SimpleDrawer>
  );
}
