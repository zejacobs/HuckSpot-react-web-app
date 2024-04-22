import axios from "axios";
axios.defaults.withCredentials = true;

export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  likedDiscs: [];
  baggedDiscs: [];
}

export const login = async (credentials: any) => {
  const response = await axios.post(`${USERS_API}/login`, credentials);
  return response.data;
};

export const register = async (user: any) => {
  const response = await axios.post(`${USERS_API}/register`, user);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${USERS_API}/logout`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${USERS_API}/currentuser`);
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
