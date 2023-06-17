import { createReducer } from "@reduxjs/toolkit";
import { deepCopy } from "../../utils/typeUtils";

import { setQuoteOfTheDay } from "../actions";
import { DEFAULT_UI_STORE_STATE } from "../types/ui";

const ui = createReducer(deepCopy(DEFAULT_UI_STORE_STATE), (builder) => {
  builder.addCase(setQuoteOfTheDay, (state, { payload }) => {
    return { ...state, quoteOfTheDay: payload };
  });
});

export default ui;
