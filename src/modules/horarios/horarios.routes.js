import express from "express";
import horario from "./horario.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import rolesMiddleware from "../../middlewares/roles.middleware.js";

const { verificarRol, ROLES } = rolesMiddleware;
const router = express.Router();

// ==========================================
// Rutas públicas
// ==========================================
router.get("/materias", horario.materias);

// ¡Ruta pública! Cualquier usuario o compañero del frontend puede consultarla sin token
router.get("/:laboratorio", horario.obtenerLab);

// ==========================================
// Rutas privadas (Protegidas)
// ==========================================

// Ahora SÍ exige Token y ser Admin/Ayudante para guardar nuevas clases
router.post(
    "/registrar_horario",
    authMiddleware,
    verificarRol(ROLES.ADMINISTRADOR, ROLES.AYUDANTE_ADMIN),
    horario.registroHorario
);

// Solo el Administrador principal debería poder borrar horarios
router.delete(
    "/eliminar",
    authMiddleware,
    verificarRol(ROLES.ADMINISTRADOR),
    horario.elimminarHora
);

export default router;