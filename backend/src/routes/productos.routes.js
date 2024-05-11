import { Router } from "express";
import { client } from "../db.js";
import pkg from "express-fileupload";
import xlsx from "xlsx";

const fileUpload = pkg;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ProductosRouters = Router();

ProductosRouters.get("/", async (req, res) => {
  console.log(req.query);

  const ql = {};
  if (req.query.q) ql.q = req.query.q;

  try {
    const searchResult = await client.search({
      index: "productos",
      size:1000,
      /* size:size ? size : 10,
      from:((page-1)*size), */
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


ProductosRouters.post("/", async (req, res) => {
  try {
    const response = await client.index({
      index: "productos",
      document: req.body,
    });
    console.log(response);
    console.log(req.body);
    return res.json({ message: "CREATE PRODUCT", data: req.body });
  } catch (error) {
    console.log(error);
  }

})
ProductosRouters.post(
  "/import-excel",

  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
  async (req, res) => {
    try {
      const { file } = req.files;
      console.log(file);
      if (!file) {
        return res.status(400).send("No se ha seleccionado ningún archivo");
      }

      const workbook = xlsx.readFile(file.tempFilePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      console.log(data);

      const operations = data.flatMap((doc) => [
        { index: { _index: "productos" } },
        doc,
      ]);

      const bulkResponse = await client.bulk({ refresh: true, operations });
      console.log(bulkResponse);

      const count = await client.count({ index: "productos" });
      console.log(count);

      return res.status(200).json({ message: "Importada Realizada", count });
    } catch (error) {
      res.status(500).send("Error al procesar el archivo: " + error.message);
    }
  }
);

ProductosRouters.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const searchResult = await client.search({
      index: "productos",
      query: { match: { _id: req.params.id } },
    });
    console.log(searchResult);
    return res.json(searchResult.hits.hits[0]._source);
  } catch (error) {
    console.log(error);
  }
});

export default ProductosRouters;
