import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const TOURNAMENT_API = `${BASE_API}/api/tournaments`;

export const findAllTournaments = async () => {
  const response = await axios.get(`${TOURNAMENT_API}`);
  return response.data;
};

export const findTournamentById = async (id: any) => {
  const response = await axios.get(`${TOURNAMENT_API}/${id}`);
  return response.data;
};

export const findTournamentsByQuery = async (query: any) => {
  const response = await axios.get(`${TOURNAMENT_API}${query}`);
  return response.data;
};

export const createTournament = async (tournament: any) => {
  const response = await axios.post(`${TOURNAMENT_API}`, tournament);
  return response.data;
};

export const updateTournament = async (tournament: any) => {
  const response = await axios.put(`${TOURNAMENT_API}/${tournament._id}`, tournament);
  return response.data;
};

export const deleteTournament = async (tournament: any) => {
  const response = await axios.delete(`${TOURNAMENT_API}/${tournament._id}`);
  return response.data;
};

export const getRecentlyAddedTournaments = async () => {
  const response = await axios.get(`${TOURNAMENT_API}/recent`);
  return response.data;
};

export const registerUserForTournament = async (tournament: any) => {
  const response = await axios.post(`${TOURNAMENT_API}/register`, tournament);
  return response.data;
};

export const unregisterUserForTournament = async (tournamentId: any) => {
  const response = await axios.delete(`${TOURNAMENT_API}/${tournamentId}/unregister`);
  return response.data;
};

export const getTournamentPlayers = async (tournamentId: any) => {
  const response = await axios.get(`${TOURNAMENT_API}/${tournamentId}/players`);
  return response.data;
};
