import { combineReducers } from "redux";

import { api } from "./api";
import { spotify } from "./spotify";
import { ui } from "./ui";
import { windows } from "./windows";

const rootReducer = combineReducers({ api, spotify, ui, windows });

export { rootReducer };
