import e, { Router } from "express";
import { client } from "../db.js";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ProgramacionRouters = Router();

ProgramacionRouters.get("/", async (req, res) => {
  try {
    const respuestaProgramacion = await client.search({
      index: "programacion_rutas",
      size: 1000,
      body: {
        query: {
          match_all: {}, // Obtener todos los documentos de programacion
        },
      },
    });
    // Obtener los IDs de las rutas de la programación encontrada
    const idsRutas = respuestaProgramacion.hits.hits.map(
      (hit) => hit._source.ruta_id
    );

    // Realizar la búsqueda en el índice de rutas utilizando los IDs obtenidos
    const respuestaRutas = await client.mget({
      index: "rutas",
      body: {
        ids: idsRutas,
      },
    });
    // Crear un mapa de IDs de rutas a objetos de ruta para unir los resultados
    const mapaRutas = {};
    respuestaRutas.docs.forEach((doc) => {
      mapaRutas[doc._id] = doc._source;
    });
    // Unir la información de la programación y la ruta asociada
    const programacionConRuta = respuestaProgramacion.hits.hits.map((hit) => ({
      ...hit._source,

      ruta: mapaRutas[hit._source.ruta_id],
    }));
    const entregasConProductos = [];
    // Iterar sobre los documentos de entregas
    for (const hit of respuestaProgramacion.hits.hits) {
      // Obtener los IDs de productos asociados a la entrega
      const idsProductos = hit._source.deliverys;
      if (idsProductos) {
        const respuestaProductos = await client.mget({
          index: "entregas",
          body: {
            ids: idsProductos,
          },
        });
        const productos = respuestaProductos.docs.map((doc) => doc._source);
        entregasConProductos.push({
          ...hit._source,
          deliveries: productos,
          id: hit._id,

          ruta: mapaRutas[hit._source.ruta_id],
        });
      } else {
        entregasConProductos.push({
          ...hit._source,
          id: hit._id,
          ruta: mapaRutas[hit._source.ruta_id],
        });
      }
    }

    return res.json(entregasConProductos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

ProgramacionRouters.post("/", async (req, res) => {
  try {
    const arr = req.body?.deliverys?.map(async (i) => {
      const result = await client.update({
        id: i,
        index: "entregas",
        doc: { status: "EN RUTA" },
      });

      return result;
    });
    await Promise.all(arr);
    const response = await client.index({
      index: "programacion_rutas",
      document: req.body,
    });

    console.log(response);
    console.log(req.body);
    return res.json({ message: "CREATE RUUTE", data: req.body });
  } catch (error) {
    console.log(error);
  }
});

export default ProgramacionRouters;
