import api from "@/config/api"
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECTS_REQUEST, INVITE_TO_PROJECTS_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionTypes"

export const fetchProjects=({category,tag})=> async(dispatch)=>
{    

    dispatch({type:FETCH_PROJECTS_REQUEST})
    try{
        const {data}=await  api.get("/api/projects",{params:{category,tag}})
        console.log("all projects,data")
        dispatch({type:FETCH_PROJECTS_SUCCESS,projects:data})

    }
    catch(error)
    {
        console.log("error",error)
    }
}

export const SearchProjects=({keyword})=> async(dispatch)=>
    {    
    
        dispatch({type:SEARCH_PROJECT_REQUEST})
        try{
            const {data}=await  api.get("/api/projects/search?keyword="+keyword)
             
            console.log("all projects,data")
            dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data})
    
        }
        catch(error)
        {
            console.log("error",error)
        }
    }



export const createProjects=({projectData})=> async(dispatch)=>
        {    
        
            dispatch({type:CREATE_PROJECT_REQUEST})
            try{
                const {data}=await  api.post("/api/projects",projectData)
                 
                console.log("all projects,data")
                dispatch({type:CREATE_PROJECT_SUCCESS,projects:data})
        
            }
            catch(error)
            {
                console.log("error",error)
            }
        }



        export const fetchProjectById=(id)=> async(dispatch)=>
            {    
            
                dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
                try{
                    const {data}=await  api.get("/api/projects/id"+id)
                     
                    console.log("searchprojects",data)
                    dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,projects:data})
            
                }
                catch(error)
                {
                    console.log("error",error)
                }
            }


    export const deleteProject=({projectId})=> async(dispatch)=>
                {    
                
                    dispatch({type:DELETE_PROJECT_REQUEST})
                    try{
                        const {data}=await  api.delete("/api/projects/id"+projectId)
                         
                        console.log(" delete projects",data)
                        dispatch({type:DELETE_PROJECT_SUCCESS,projects:data})
                
                    }
                    catch(error)
                    {
                        console.log("error",error)
                    }
                }

export const inviteToProject=({email,projectId})=> async(dispatch)=>
                    {    
                    
                        dispatch({type:INVITE_TO_PROJECTS_REQUEST})
                        try{
                            const {data}=await  api.post("/api/projects/invite",{email,projectId})
                             
                            console.log(" invite projects",data)
                            dispatch({type:INVITE_TO_PROJECTS_SUCCESS,payload:data})
                    
                        }
                        catch(error)
                        {
                            console.log("error",error)
                        }
                    }







export const acceptInvitation=({invitationToken,navigate})=> async(dispatch)=>
 {    
                        
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try{
    const {data}=await  api.get("/api/projects/accept_invitation",{
        params:{
            token:invitationToken
        }
    })

    navigate("/project"+data.projectId)
                                 
    console.log(" Accept invitation")
   dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data})
                        
    }
    catch(error)
    {
     console.log("error",error)
    }
}