import { combineReducers } from "redux";

import { api } from "./api";
import { ui } from "./ui";
import { windows } from "./windows";

const rootReducer = combineReducers({ api, ui, windows });

export { rootReducer };
