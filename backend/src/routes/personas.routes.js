import { Router } from "express";
import { client } from "../db.js";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PersonasRouters = Router();

PersonasRouters.get("/", async (req, res) => {
  console.log(req.query);

  const ql = {};
  if (req.query.q) ql.q = req.query.q;
  const  { size, page}  = req.query;
  try {
    const searchResult = await client.search({
      index: "personas",
      size:size,
      from:((page-1)*size),
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

PersonasRouters.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const searchResult = await client.search({
      index: "personas",
      query: { match: { _id: req.params.id } },
    });
    console.log(searchResult);
    return res.json(searchResult.hits.hits[0]._source);
  } catch (error) {
    console.log(error);
  }
});

PersonasRouters.post("/", async (req, res) => {
  try {
    const response = await client.index({
      index: "personas",
      document: req.body,
    });
    console.log(response);
    console.log(req.body);
    return res.json({ message: "CREATE PERSON", data: req.body });
  } catch (error) {
    console.log(error);
  }
});

PersonasRouters.patch("/:id", async (req, res) => {
  try {
    const response = await client.update({
      id: req.params.id,
      index: "personas",
      doc: req.body,
    });

    console.log(response);
    return res.json({ message: "Full", response });
  } catch (error) {
    console.log(error);
  }
});

export default PersonasRouters;
