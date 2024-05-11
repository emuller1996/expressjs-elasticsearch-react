import axios from "axios";

export const getAllEntregasService = async () => {
  return await axios.get(`/entregas/`);
};

export const createEntregasService = async (data) => {
  return await axios.post(`/entregas/`, data);
};
