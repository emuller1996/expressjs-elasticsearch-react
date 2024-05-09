import { Router } from "express";
import { client } from "../db.js";
import PersonasRouters from "./personas.routes.js";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/persons", PersonasRouters);

export default router;
