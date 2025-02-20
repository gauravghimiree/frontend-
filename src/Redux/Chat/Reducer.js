import * as actionTypes from './ActionTypes';

const initialState = {
  messages: [], // List of messages with id, content, createdAt, senderName, etc.
  loading: false,
  error: null,
  chat: null, // Chat details (e.g., project chat)
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_REQUEST:
    case actionTypes.SEND_MESSAGE_REQUEST:
    case actionTypes.FETCH_CHAT_MESSAGES_REQUEST:
    case actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // For fetching messages (or chat messages) the backend now returns objects with senderName
    case actionTypes.FETCH_MESSAGES_SUCCESS:
    case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.messages, // Each message includes id, content, createdAt, senderName
      };

    // When sending a message, append the returned message (with senderName) to the list
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.message],
      };

    case actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: action.chat,
      };

    case actionTypes.FETCH_MESSAGES_FAILURE:
    case actionTypes.SEND_MESSAGE_FAILURE:
    case actionTypes.FETCH_CHAT_MESSAGES_FAILURE:
    case actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default ChatReducer;
