import { useState } from "react";
import { getAllEntregasService } from "services/entregas.services";

export const useEntregas = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllEntregas = async () => {
    setLoading(true);
    try {
      const res = await getAllEntregasService();
      if (res.status !== 200) {
        let err = new Error("Error en la petición Fetch");
        err.status = res.status || "00";
        err.statusText = res.statusText || "Ocurrió un error";
        throw err;
      }
      console.log(res);

      if (!signal.aborted) {
        setData(res.data);
        setError(null);
      }
    } catch (error) {
      if (!signal.aborted) {
        setData(null);
        setError(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  return {
    data,
    error,
    loading,
    getAllEntregas,
  };
};
