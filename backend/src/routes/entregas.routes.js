import { Router } from "express";
import { client } from "../db.js";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const EntregasRouters = Router();

EntregasRouters.get("/", async (req, res) => {
  console.log(req.query);

  const ql = {};
  if (req.query.q) ql.q = req.query.q;
  const { size, page } = req.query;
  try {
    const searchResult = await client.search({
      index: "entregas",
      size:1000,
      /* from:((page-1)*size), */
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

EntregasRouters.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const searchResult = await client.search({
      index: "entregas",
      query: { match: { _id: req.params.id } },
    });
    console.log(searchResult);
    return res.json(searchResult.hits.hits[0]._source);
  } catch (error) {
    console.log(error);
  }
});

EntregasRouters.post("/", async (req, res) => {
  try {
   
    const response = await client.index({
      index: "entregas",
      document: req.body,
    });
    console.log(response);
    console.log(req.body);
    return res.json({ message: "CREATE DELIVERY", data: req.body });
  } catch (error) {
    console.log(error);
  }
});

export default EntregasRouters;
