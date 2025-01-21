import { error } from "console"
import { SearchProjects } from "./Action";
import { ACCEPT_INVITATION_REQUEST, CREATE_PROJECT_REQUEST, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECTS_REQUEST } from "./ActionTypes";
import ProjectDetails from "@/pages/ProjectDetails/ProjectDetails";


 const initialState={
   projects:[],
   loading :false,
   error:null,
   projectDetatils:null,
   searchProjects:[]
 }

  export const projectReducer =(state=initialState,action)=>
 {
    switch (action.type)
    {

        case FETCH_PROJECTS_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_BY_ID_REQUEST:
        case ACCEPT_INVITATION_REQUEST:
        
        case INVITE_TO_PROJECTS_REQUEST:
          return{
            ...state,
            loading:true,
            error:null
          }
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                loading:false,
                projectS:action.payload,
                error:null
            }
            case SEARCH_PROJECT_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    SearchProjects:action.payload,
                    error:null
                };
            case SEARCH_PROJECT_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        Projects:[...state.projects,action.project],
                        error:null
                    };

            case FETCH_PROJECT_BY_ID_SUCCESS:
                        return {
                            ...state,
                            loading:false,
                            ProjectDetails:action.project,
                            error:null
                        };
                
                case DELETE_PROJECT_SUCCESS:
                            return {
                                ...state,
                                loading:false,
                                Projects:state.projects.filter(project=> project.id===
                                    action.projectId
                                ),
                                error:null
                            };
                    
                

        default :
        state;
    }
 }
