import express from "express";

// Importación del controlador de bitácora
// donde se encuentran todas las funciones.
import bitacora from "../bitacora/bitacora.controller.js";

// Middleware de autenticación
// utilizado para proteger rutas.
import authMiddleware from "../../middlewares/auth.middleware.js";

// ==========================================
// Creación del router de Express
// ==========================================

// Se crea una instancia del enrutador
// para manejar las rutas relacionadas
// con bitácoras.
const route = express.Router();

// ==========================================
// Rutas GET
// ==========================================

// Ruta para obtener todos los maestros.
route.get("/maestros",bitacora.maestros
);

// Ruta para obtener maestros
// mediante otra consulta.
route.get(    "/obtener_maestros",bitacora.obtener_maestros
);

// Ruta para obtener carreras.
route.get("/maestros_carrera",bitacora.Obtenertodo
);

// Ruta para obtener bitácoras
// filtradas por fecha.
route.get("/:fecha",bitacora.BitacoraFecha
);

// ==========================================
// Ruta POST
// ==========================================

// Ruta para registrar una nueva bitácora.
// Primero pasa por el middleware de autenticación
// y después ejecuta el controlador.
route.post("/registrar",authMiddleware,bitacora.RegistrarBitacora
);

// ==========================================
// Exportación del router
// ==========================================

// Se exporta el router para poder
// utilizarlo en la aplicación principal.
export default route;