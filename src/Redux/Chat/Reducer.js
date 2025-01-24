import * as actionTypes from './ActionTypes';

const initialState = {
  messages: [], // Holds the list of messages
  loading: false, // Indicates whether data is being fetched or sent
  error: null, // Holds any error messages from failed actions
  chat: null, // Holds chat-specific data (e.g., details about the chat/project)
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_REQUEST:
    case actionTypes.SEND_MESSAGE_REQUEST:
    case actionTypes.FETCH_CHAT_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Reset error when starting a new request
      };

    case actionTypes.FETCH_MESSAGES_SUCCESS:
    case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false, // Request completed
        messages: action.messages, // Update with the fetched messages
      };

    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false, // Request completed
        messages: [...state.messages, action.message], // Append the new message
      };

    case actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false, // Request completed
        chat: action.chat, // Update the chat details
      };

    case actionTypes.FETCH_MESSAGES_FAILURE:
    case actionTypes.SEND_MESSAGE_FAILURE:
    case actionTypes.FETCH_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false, // Request failed
        error: action.error, // Update with the error message
      };

    default:
      return state; // Return the current state for any unknown action types
  }
};

export default ChatReducer;
