import { Router } from "express";
import { client } from "../db.js";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const RutaRouters = Router();

RutaRouters.get("/", async (req, res) => {
  console.log(req.query);

  const ql = {};
  if (req.query.q) ql.q = req.query.q;

  try {
    const searchResult = await client.search({
      index: "rutas",
      size: 1000,
      /*  from:((page-1)*size), */
      query: {
        match_all: {},
      },
    });
    console.log(searchResult);
    const data = searchResult.hits.hits.map((i) => {
      return { ...i._source, id: i._id };
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

RutaRouters.post("/", async (req, res) => {
  try {
    const response = await client.index({
      index: "rutas",
      document: req.body,
    });
    console.log(response);
    console.log(req.body);
    return res.json({ message: "CREATE RUUTE", data: req.body });
  } catch (error) {
    console.log(error);
  }
});

export default RutaRouters;
