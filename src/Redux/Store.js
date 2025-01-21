import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Use a named import for redux-thunk
import { authReducer } from "./Auth/Reducer";
import { projectReducer } from "./DemoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project :  projectReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
