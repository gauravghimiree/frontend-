import api from "@/config/api";
import { 
  ACCEPT_INVITATION_REQUEST, 
  ACCEPT_INVITATION_SUCCESS, 
  CREATE_PROJECT_REQUEST, 
  DELETE_PROJECT_REQUEST, 
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS, 
  FETCH_PROJECT_BY_ID_REQUEST, 
  FETCH_PROJECT_BY_ID_SUCCESS, 
  FETCH_PROJECTS_REQUEST, 
  FETCH_PROJECTS_SUCCESS, 
  INVITE_TO_PROJECTS_FAILURE, 
  INVITE_TO_PROJECTS_REQUEST, 
  INVITE_TO_PROJECTS_SUCCESS, 
  SEARCH_PROJECT_REQUEST, 
  SEARCH_PROJECT_SUCCESS 
} from "./ActionTypes";

// Fetch all projects
export const fetchProjects = ({ category, tag }) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
    const { data } = await api.get("/api/projects", { params: { category, tag } });
    console.log("Fetched projects:", data);
    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: data });  // Consistent 'payload'
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Search projects
export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  console.log("Searching for keyword:", keyword);
  try {
    const { data } = await api.get(`/api/projects/search`, { params: { keyword } });
    console.log("Search projects response:", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data });  // Consistent 'payload'
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

// Create a new project
export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.log("Project created:", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });  // Consistent 'payload'
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

// Fetch project by ID
export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/projects/${id}`);
    console.log("Fetched project data:", data);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: data });  // Consistent 'payload'
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

// Delete a project
export const deleteProject = ({ projectId }) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    const { data } = await api.delete(`/api/projects/${projectId}`);
    console.log("Delete response:", data);
    dispatch({ type: DELETE_PROJECT_SUCCESS, projectId: data.deletedProjectId });
  } catch (error) {
    console.error("Error deleting project:", error.response?.data || error.message);
  }
};

// Invite user to project
export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
  console.log("Inviting user with data:", { email, projectid: projectId }); // Debug log

  dispatch({ type: INVITE_TO_PROJECTS_REQUEST }); // Dispatch request action

  try {
    const { data } = await api.post("/api/projects/invite", {
      email,
      projectid: projectId, // Use "projectid" as expected by the backend
    });

    console.log("Invite response:", data);

    dispatch({
      type: INVITE_TO_PROJECTS_SUCCESS, // Dispatch success action with payload
      payload: data,
    });
  } catch (error) {
    console.error("Error inviting to project:", error);

    dispatch({
      type: INVITE_TO_PROJECTS_FAILURE, // Dispatch failure action with error message
      payload: error.response?.data?.message || "Failed to invite user", // Provide a meaningful error message
    });
  }
};

// Accept project invitation
export const acceptInvitation = ({ invitationToken, navigate }) => async (dispatch) => {
  dispatch({ type: ACCEPT_INVITATION_REQUEST });
  try {
    const { data } = await api.get("/api/projects/accept_invitation", {
      params: { token: invitationToken },
    });
    navigate(`/project/${data.projectId}`);
    console.log("Invitation accepted:", data);
    dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error accepting invitation:", error);
  }
};
