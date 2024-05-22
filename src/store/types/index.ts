import { Immutable } from "../../utils/typeUtils";
import { ApiStoreState, DEFAULT_API_STORE_STATE } from "./api";
import { DEFAULT_SPOTIFY_STORE_STATE, SpotifyStoreState } from "./spotify";
import { DEFAULT_UI_STORE_STATE, UiStoreState } from "./ui";
import { DEFAULT_WINDOWS_STORE_STATE, WindowsStoreState } from "./windows";

export type StoreState = {
  api: ApiStoreState;
  spotify: SpotifyStoreState;
  ui: UiStoreState;
  windows: WindowsStoreState;
};

export const DEFAULT_STORE_STATE: Immutable<StoreState> = {
  api: DEFAULT_API_STORE_STATE,
  spotify: DEFAULT_SPOTIFY_STORE_STATE,
  ui: DEFAULT_UI_STORE_STATE,
  windows: DEFAULT_WINDOWS_STORE_STATE,
};
