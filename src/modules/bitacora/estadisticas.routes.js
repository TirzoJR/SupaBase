import { Router } from 'express';
import { getHorasPorCarrera, getUsoLaboratorios, getHorasDocentePorMateria, getHorasMateriaPorPeriodo, getUsoLaboratorioDetallado } from './estadisticas.controller.js';
const router = Router();
import authMiddleware from "../../middlewares/auth.middleware.js";

router.get('/carreras', authMiddleware, getHorasPorCarrera);
router.get('/laboratorios', authMiddleware, getUsoLaboratorios);
router.get('/docente/:maestro_id', authMiddleware, getHorasDocentePorMateria);
router.get('/materia/:materia', authMiddleware, getHorasMateriaPorPeriodo);
router.get('/laboratorio/:laboratorio_id/detalles', authMiddleware, getUsoLaboratorioDetallado);

export default router;