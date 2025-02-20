import api from "@/config/api.js";
import * as actionTypes from "./ActionTypes.js";

// Function to send a message
export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST });
    try {
      // Endpoint to send message, which returns the newly created message (with senderName, etc.)
      const response = await api.post("/api/messages/send", messageData);
      dispatch({
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        message: response.data, // response.data contains the new message details
      });
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch({
        type: actionTypes.SEND_MESSAGE_FAILURE,
        error: error?.response?.data?.message || error.message,
      });
    }
  };
};

// Function to fetch chat by project
export const fetchChatByProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
      // Endpoint to fetch the chat related to the project
      const response = await api.get(`/api/projects/${projectId}/chat`);
      console.log("Fetched chat:", response.data);
      dispatch({
        type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
        chat: response.data, // response.data contains the chat details
      });
    } catch (error) {
      console.error("Error fetching chat by project:", error);
      dispatch({
        type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
        error: error?.response?.data?.message || error.message,
      });
    }
  };
};

// Function to fetch chat messages
export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
    try {
      // Endpoint to fetch messages from a chat. The backend returns a list of messages.
      const response = await api.get(`/api/messages/chat/${chatId}`);
      console.log("Fetched messages:", response.data);
      dispatch({
        type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
        messages: response.data, // response.data contains the list of messages
      });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      dispatch({
        type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
        error: error?.response?.data?.message || error.message,
      });
    }
  };
};
