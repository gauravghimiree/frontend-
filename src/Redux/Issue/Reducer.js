import * as actionTypes from "./ActionType.js"; // Ensure correct import of action types

const initialState = {
  loading: false,
  error: null,
  issueDetails: null,
  issues: [],
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISSUES_REQUEST:
    case actionTypes.CREATE_ISSUE_REQUEST:
    case actionTypes.DELETE_ISSUE_REQUEST:
    case actionTypes.FETCH_ISSUES_BY_ID_REQUEST:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.issues, // Ensure action.issues is an array
      };

    case actionTypes.FETCH_ISSUES_BY_ID_SUCCESS:
    case actionTypes.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails: action.issue, // Ensure action.issue is a single object
      };

    case actionTypes.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.issue], // Append the new issue to the list
      };

    case actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.issue.id ? action.issue : issue
        ),
      };

    case actionTypes.DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter((issue) => issue.id !== action.issueId),
      };

    case actionTypes.FETCH_ISSUES_FAILURE:
    case actionTypes.CREATE_ISSUE_FAILURE:
    case actionTypes.DELETE_ISSUE_FAILURE:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};



export default issueReducer;
