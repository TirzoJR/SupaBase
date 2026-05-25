import express from "express";
import bitacora from "../bitacora/bitacora.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const route = express.Router();


route.get("/maestros", bitacora.maestros);
route.get("/obtener_maestros",bitacora.obtener_maestros)
route.get("/maestros_carrera", bitacora.Obtenertodo)
route.get("/:fecha",bitacora.BitacoraFecha)
route.post("/registrar",authMiddleware,bitacora.RegistrarBitacora)



export default route;