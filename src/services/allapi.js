import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"



//register
export const registerapi= async (reqbody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqbody,'')
}

//login
export const loginapi= async (reqbody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqbody,'')
}

//addproject
export const addprojectapi= async (reqbody , reqheader)=>{
    return await commonApi('POST',`${serverUrl}/addproject`,reqbody,reqheader)
}

//homeproject
export const homeprojectapi= async ()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

//all projects
export const allprojectapi= async (searchkey,reqheader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchkey}`,'',reqheader)
}

//user projects
export const userprojectapi= async (reqheader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,'',reqheader)
}

//remove user project
export const remuserprojectapi= async (id,reqheader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-user-project/${id}`,{},reqheader)
}

//update user project
export const updateuserprojectapi= async (id,reqbody,reqheader)=>{
    return await commonApi('PUT',`${serverUrl}/update-user-project/${id}`,reqbody,reqheader)
}

//update profile
export const updateprofileapi=async(reqbody,reqheader)=>{
    return await commonApi('PUT',`${serverUrl}/update-profile`,reqbody,reqheader)
}