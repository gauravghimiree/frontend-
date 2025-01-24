import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Use a named import for redux-thunk
import { authReducer } from "./Auth/Reducer";
// Store.js or rootReducer.js

import {projectReducer } from './Project/Reducer';  // Make sure the path is correct

import ChatReducer from "./Chat/Reducer";
import commentReducer from "./Comment/Reducer";
import issueReducer from "./Issue/Reducer"; // Import issueReducer from its correct location

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  chat: ChatReducer,
  comment: commentReducer,
  issue: issueReducer,  // Added issueReducer here
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
