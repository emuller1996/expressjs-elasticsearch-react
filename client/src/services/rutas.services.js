import axios from "axios";

export const getAllRutasService = async () => {
  return await axios.get(`/rutas/`);
};

export const createRutasService = async (data) => {
  return await axios.post(`/rutas/`, data);
};
