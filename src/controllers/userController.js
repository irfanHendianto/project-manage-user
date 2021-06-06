
import axios from "axios";

export const getAllUser = async (token) => {
  const response = await  axios.get(`http://localhost:3000/api/user/list`,{headers: {"x-access-token" : token}});
  return response
};


export const handleAssignUser = async (assign,token) => {
       const  response = await axios.post(`http://localhost:3000/api/user/assign-admin/${assign}`,{},{headers: {"x-access-token" : token}})
       return response;

};