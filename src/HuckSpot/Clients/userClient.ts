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

export const findUsersByQuery = async (query: any) => {
  const response = await axios.get(`${USERS_API}${query}`);
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

export const userBagsDisc = async (disc: any) => {
  const response = await axios.post(`${BASE_API}/api/bags`, disc);
  return response.data;
};

export const userUnBagsDisc = async (discId: any) => {
  const response = await axios.delete(`${BASE_API}/api/bags/${discId}`);
  return response.data;
};

export const fetchDiscsUserBags = async (userId: any) => {
  const response = await axios.get(`${BASE_API}/api/bags/${userId}`);
  return response.data;
};

export const doesUserBagDisc = async (userId: any, discId: any) => {
  const response = await fetchDiscsUserBags(userId);
  if (response) {
    return !!response.find((disc: any) => disc.discId === discId);
  }
  return false;
};

export const fetchUserTournaments = async (userId: any) => {
  const response = await axios.get(`${USERS_API}/tournaments/${userId}`);
  return response.data;
};

export const isUserRegisteredforTournament = async (userId: any, tournamentId: any) => {
  const response = await fetchUserTournaments(userId);
  if (response) {
    return !!response.find((tournament: any) => tournament.tournamentId === tournamentId);
  }
  return false;
};

export const findUserRecentTournamentRegistrations = async (userId: any) => {
  const registrations = await fetchUserTournaments(userId);
  const recentRegistrations = registrations.slice(-3).reverse();
  return recentRegistrations;
};
