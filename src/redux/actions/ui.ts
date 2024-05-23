import { createAction } from "@reduxjs/toolkit";

function uiActionType(type: string) {
  return `UI_${type}`;
}

export const setQuoteOfTheDay = createAction<string>(
  uiActionType("set_quote_of_the_day")
);
