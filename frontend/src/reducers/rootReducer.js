import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    book: bookReducer,
    ui: uiReducer
});