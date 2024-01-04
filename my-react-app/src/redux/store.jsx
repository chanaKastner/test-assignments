import { createStore } from "redux";
import { dataReducer } from "./reduser";

export const store = createStore(dataReducer);
window.store = store;