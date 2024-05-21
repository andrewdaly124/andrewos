import { APP_IDS, AppIds } from "../../types/shortcuts";
import { Immutable } from "../../utils/typeUtils";

export type WindowsStoreState = {
  [k in AppIds]: boolean;
} & {
  appZOrder: AppIds[];
};

export const DEFAULT_WINDOWS_STORE_STATE: Immutable<WindowsStoreState> = {
  "pepper-pics": false,
  chess: false,
  pentris: false,
  "old-projects": false,
  about: false,
  spotify: false,
  appZOrder: [...APP_IDS],
};
