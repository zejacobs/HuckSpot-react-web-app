import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const LIKES_API = `${BASE_API}/api/likes`;

export const userLikesDisc = async (disc: any) => {
  const response = await axios.post(`${LIKES_API}`, disc);
  return response.data;
};

export const userUnlikesDisc = async (discId: any) => {
  const response = await axios.delete(`${LIKES_API}/${discId}`);
  return response.data;
};

export const fetchDiscsUserLikes = async () => {
  const response = await axios.get(`${LIKES_API}`);
  return response.data;
};

export const doesUserLikeDisc = async (discId: any) => {
  const response = await fetchDiscsUserLikes();
  if (response) {
    return !!response.find((disc: any) => disc.discId === discId);
  }
  return false;
};
