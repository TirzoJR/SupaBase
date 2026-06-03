import { Router } from 'express';

// Importación de las funciones controladoras
// encargadas de las estadísticas.
import {
    getHorasPorCarrera,
    getUsoLaboratorios,
    getHorasDocentePorMateria,
    getHorasMateriaPorPeriodo,
    getUsoLaboratorioDetallado
} from './estadisticas.controller.js';

// Creación del router de Express
const router = Router();

// Middleware de autenticación
// utilizado para proteger las rutas.
import authMiddleware from "../../middlewares/auth.middleware.js";

// ==========================================
// Rutas de estadísticas
// ==========================================

// Ruta para obtener las horas registradas
// por carrera en un rango de fechas.
router.get(
    '/carreras',
    authMiddleware,
    getHorasPorCarrera
);

// Ruta para consultar el uso de laboratorios.
router.get(
    '/laboratorios',
    authMiddleware,
    getUsoLaboratorios
);

// Ruta para obtener las horas de un docente
// filtradas por materia.
router.get(
    '/docente/:maestro_id',
    authMiddleware,
    getHorasDocentePorMateria
);

// Ruta para consultar las horas de una materia
// en un periodo específico.
router.get(
    '/materia/:materia',
    authMiddleware,
    getHorasMateriaPorPeriodo
);

// Ruta para obtener el uso detallado
// de un laboratorio específico.
router.get(
    '/laboratorio/:laboratorio_id/detalles',
    authMiddleware,
    getUsoLaboratorioDetallado
);

// ==========================================
// Exportación del router
// ==========================================

// Se exporta el router para utilizarlo
// en la aplicación principal.
export default router;