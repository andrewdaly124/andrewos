import { Immutable } from "../../utils/typeUtils";
import { DEFAULT_UI_STORE_STATE, UiStoreState } from "./ui";

export type StoreState = {
  ui: UiStoreState;
};

export const DEFAULT_STORE_STATE: Immutable<StoreState> = {
  ui: DEFAULT_UI_STORE_STATE,
};
