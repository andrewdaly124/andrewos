import { APP_IDS, AppIds } from "../../types/shortcuts";
import { Immutable } from "../../utils/typeUtils";

export type WindowsStoreState = Record<AppIds, boolean> & {
  "pepper-pics": boolean;
  chess: boolean;
  pentris: boolean;
  "old-projects": boolean;
  about: boolean;
  appZOrder: AppIds[];
};

export const DEFAULT_WINDOWS_STORE_STATE: Immutable<WindowsStoreState> = {
  "pepper-pics": false,
  chess: false,
  pentris: false,
  "old-projects": false,
  about: false,
  appZOrder: [...APP_IDS],
};
