
import axios from "axios";

export const login = async (values) => {
  const response = await axios.post(`http://localhost:3000/api/auth/login`, {username: values.username, password: values.password})
  return response
};

export const check = async (token) => {
  const response = await axios.get(`http://localhost:3000/api/auth/check`, {headers: {"x-access-token" : token}})
  const {_id,username,admin} = response.data.info;
  return {
    _id: _id,
    username : username,
    admin : admin,
    token : token
  }
};

export const register = async (values) => {
       const  response = await axios.post(`http://localhost:3000/api/auth/register`,{username: values.username, password: values.password})
       return response;

};