import api from "@/config/api";
import * as actionTypes from "./ActionType.js";

// Fetch issues for a specific project
export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      console.log("fetch issues", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

// Fetch a specific issue by ID
export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      console.log("fetch issue by id", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issue: response.data, // Changed from issues to issue for consistency
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

// Create a new issue
export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issues", issueData);
      console.log("create issue response", response.data);
      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data, // Assuming the response contains the created issue
      });
      console.log("issue Created successfully",response.data)
    } catch (error) {
      console.log("error creating issue", error);
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// Update the status of an issue
export const updateIssueStatus = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      console.log("Updated issue status:", response.data);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.response?.data?.message || error.message,
      });
    }
  };
};

// Assign a user to an issue
export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
      console.log("assigned issue -", response.data);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data, // Changed from issues to issue for consistency
      });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
    try {
      const response = await api.delete(`/api/issues/${issueId}`);
      console.log("Issue deleted successfully:", response.data);

      dispatch({
        type: actionTypes.DELETE_ISSUE_SUCCESS,
        issueId, // Send the ID of the deleted issue
      });
    } catch (error) {
      console.error("Error deleting issue:", error.message);
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};



