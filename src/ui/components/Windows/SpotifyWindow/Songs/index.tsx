import { useState } from "react";

import { useSpotifyStore } from "../../../../../zustand";
import { Dropdown, ListItem } from "../../../Dropdown";
import { WindowButton } from "../../../WindowButton";
import { usePopulateSongs } from "./helpers/populateSongs";

type SongsSort = "track" | "artist" | "album" | "added" | "release" | "length";

const SORT_OPTIONS: Record<SongsSort, string> = {
  track: "Track Name",
  artist: "Artist Name",
  album: "Album Name",
  release: "Release Date",
  added: "Date Added",
  length: "Track Length",
};

const SORT_OPTIONS_ARR = (() => {
  const keys = Object.keys(SORT_OPTIONS);
  const arr: ListItem[] = [];
  for (const key of keys) {
    arr.push({ key: key, label: SORT_OPTIONS[key] });
  }
  return arr;
})();

export function Songs() {
  const tracks = useSpotifyStore((state) => state.tracks);

  const { populateSongs, loadingSongs } = usePopulateSongs();

  const sortType = useState<SongsSort>("track");

  console.log(tracks?.[0]);

  return (
    <>
      <span>
        <WindowButton onClick={populateSongs}>Get Songs</WindowButton>
        <Dropdown
          onSelect={(key) => console.log(key)}
          options={SORT_OPTIONS_ARR}
        />
      </span>
      {loadingSongs && "Loading songs..."}
      {!loadingSongs &&
        tracks &&
        tracks.map((track, i) => (
          <div key={track.track.id}>
            {i}:{track.track.name}
          </div>
        ))}
    </>
  );
}
