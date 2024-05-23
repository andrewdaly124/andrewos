import { Immutable } from "../../utils/typeUtils";

export type UiStoreState = {
  quoteOfTheDay: string;
};

export const DEFAULT_UI_STORE_STATE: Immutable<UiStoreState> = {
  quoteOfTheDay:
    "I know it hurts, Luffy...! But you have to smother all that!!! Don't just count your losses!!! What's gone is gone!!! But think about it!!! You still have some things left, DON'T YOU!!?",
};
