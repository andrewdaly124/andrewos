import { StoreState } from "../types";

export const getQuoteOfTheDay = ({ ui }: StoreState) => ui.quoteOfTheDay;
