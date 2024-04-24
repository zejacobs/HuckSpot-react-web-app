import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const DISCS_API = `${BASE_API}/api/discs`;

export const findUsersThatLikeDisc = async (discId: any) => {
  try {
    const response = await axios.get(`${DISCS_API}/${discId}/likes`);
    return response.data;
  } catch (err) {
    return [];
  }
};
