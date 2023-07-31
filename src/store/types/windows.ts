import { ShortcutIds } from "../../types/shortcuts";
import { Immutable } from "../../utils/typeUtils";

export type WindowsStoreState = Record<ShortcutIds, boolean>;

export const DEFAULT_WINDOWS_STORE_STATE: Immutable<WindowsStoreState> = {
  "pepper-pics": false,
  chess: false,
  pentris: false,
  "old-projects": false,
  about: false,
};
