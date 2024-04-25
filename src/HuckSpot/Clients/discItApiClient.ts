import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const DISC_IT_API = `${BASE_API}/api/discIt`;

export const fetchRandomDisc = async () => {
  const response = await axios.get(`${DISC_IT_API}`);
  return response.data;
};

export const fetchDiscById = async (discId: any) => {
  const response = await axios.get(`${DISC_IT_API}/${discId}`);
  return response.data;
};

export const fetchDiscResults = async (queryString: any) => {
  const response = await axios.post(`${DISC_IT_API}`, queryString);
  return response.data;
};
