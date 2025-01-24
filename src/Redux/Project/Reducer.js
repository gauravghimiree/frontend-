import {
  ACCEPT_INVITATION_REQUEST,
  CREATE_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECTS_REQUEST,
  INVITE_TO_PROJECTS_SUCCESS, // Add success action
  INVITE_TO_PROJECTS_FAILURE, // Add failure action
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionTypes";

const initialState = {
  projects: [],         // List of all projects
  loading: false,       // Loading state
  error: null,          // Error state
  projectDetails: null, // Details of a single project
  searchProjects: [],   // List of searched projects
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case INVITE_TO_PROJECTS_REQUEST:
    case SEARCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
        error: null,
      };

    case SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProjects: action.payload,
        error: null,
      };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
        error: null,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
        searchProjects: state.searchProjects.filter(
          (project) => project.id !== action.projectId
        ),
        error: null,
      };

    // New cases to handle invitation success and failure
    case INVITE_TO_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case INVITE_TO_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error, // Capture the error
      };

    default:
      return state;
  }
};
