import { Immutable } from "../../utils/typeUtils";
import { DEFAULT_UI_STORE_STATE, UiStoreState } from "./ui";
import { DEFAULT_WINDOWS_STORE_STATE, WindowsStoreState } from "./windows";

export type StoreState = {
  ui: UiStoreState;
  windows: WindowsStoreState;
};

export const DEFAULT_STORE_STATE: Immutable<StoreState> = {
  ui: DEFAULT_UI_STORE_STATE,
  windows: DEFAULT_WINDOWS_STORE_STATE,
};
