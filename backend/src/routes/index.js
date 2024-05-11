import { Router } from "express";
import { client } from "../db.js";
import PersonasRouters from "./personas.routes.js";
import RutaRouters from "./ruta.routes.js";
import ProgramacionRouters from "./programacio.routes.js";
import ProductosRouters from "./productos.routes.js";
import EntregasRouters from "./entregas.routes.js";





// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/persons", PersonasRouters);
router.use("/rutas", RutaRouters);
router.use("/programacion-rutas", ProgramacionRouters);
router.use("/productos", ProductosRouters);
router.use("/entregas", EntregasRouters);






export default router;
