import axios from "axios";

export const getAllProductsService = async () => {
  return await axios.get(`/productos/`);
};

export const createProductsService = async (data) => {
  return await axios.post(`/productos/`, data);
};
