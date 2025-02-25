import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";

//registerAPI
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${server_url}/register`, user, "");
};

//loginAPI
export const loginAPI = async (user) => {
  return await commonAPI("POST", `${server_url}/login`, user, "");
};

// updateUserAPI
export const updateUserAPI = async (reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${server_url}/updateProfile`,reqBody,reqHeader)
}

//getUserAPI
export const getUserAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user`, "", reqHeader);
};

//addProjectAPI
export const addProjectAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/addproject`,
    reqBody,
    reqHeader
  );
};

//getHomeProjectAPI
export const getHomeProjectAPI = async () => {
  return await commonAPI("GET", `${server_url}/homeprojects`, "", "");
};

//getAllProjectAPI
export const getAllProjectAPI = async (searchKey, reqHeader) => {
  return await commonAPI(
    "GET",
    `${server_url}/allprojects?search=${searchKey}`,
    "",
    reqHeader
  );
};

//getUserProjectAPI
export const getUserProjectAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/userprojects`, "", reqHeader);
};

//editUserProjectAPI
export const editUserProjectAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${server_url}/projects/edit/${id}`,
    reqBody,
    reqHeader
  );
};

//deleteUserProjectAPI
export const deleteUserProjectAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${server_url}/projects/remove/${id}`,
    {},
    reqHeader
  );
};
