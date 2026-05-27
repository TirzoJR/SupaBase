import { Router } from 'express';
import { 
    getHorasPorCarrera, 
    getUsoLaboratorios, 
    getHorasDocentePorMateria, 
    getHorasMateriaPorPeriodo 
} from './estadisticas.controller.js';

const router = Router();

router.get('/carreras', getHorasPorCarrera);
router.get('/laboratorios', getUsoLaboratorios);
router.get('/docente/:maestro_id', getHorasDocentePorMateria);
router.get('/materia/:materia', getHorasMateriaPorPeriodo);
router.get('/laboratorio/:laboratorio_id/detalles', getUsoLaboratorioDetallado);

export default router;