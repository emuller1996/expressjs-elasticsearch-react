import axios from "axios";

export const getAllProgramacionRutasService = async () => {
  return await axios.get(`/programacion-rutas/`);
};

export const createProgramacionRutasService = async (data) => {
  return await axios.post(`/programacion-rutas/`, data);
};
