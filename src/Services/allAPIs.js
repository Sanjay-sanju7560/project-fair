import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"

// register api 
 export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
 }
    // login api 
    export const loginAPI = async (user)=>{
        return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
    }
 //  api 
 export const addProjectAPI = async (reqBody,reqwHeader)=>{
   return await commonAPI("POST",`${SERVER_URL}/add-projects`,reqBody,reqwHeader)

 }

// home project api 
export const getHomeProjectsAPI = async ()=>{
   return await commonAPI("GET",`${SERVER_URL}/home-projects`,"","")
}

// all project  api 
export const getAllProjectsAPI = async (searchKey,reqwHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqwHeader)
}

// user project  api 
export const getUserProjectsAPI = async (reqwHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqwHeader)
}

// edit project  api 
export const editProjectsAPI = async (id,reqBody,reqwHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqwHeader)
}

// renomve project  api 
export const deleteProjectsAPI = async (id,reqwHeader)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/project/remove/${id}`,{},reqwHeader)
}

// user edit api 
export const updateUserProfileAPI = async (reqBody,reqwHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqwHeader)
}