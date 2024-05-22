import { Immutable } from "../../utils/typeUtils";

export type ApiStoreState = {
  spotifyAccessToken: string | null;
};

export const DEFAULT_API_STORE_STATE: Immutable<ApiStoreState> = {
  spotifyAccessToken: null,
};
