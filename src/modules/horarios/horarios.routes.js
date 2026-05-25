import express from "express";
import horario from "./horario.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import rolesMiddleware from "../../middlewares/roles.middleware.js";

const { verificarRol, ROLES } = rolesMiddleware;
const router = express.Router();

// Pública cualquiera puede consultar horarios
router.get("/materias",horario.materias)
// Privada  solo admin o ayudante pueden registrar horarios
router.post("/registrar_horario", horario.registroHorario);

router.get("/:laboratorio", horario.obtenerLab);

router.delete("/eliminar",horario.elimminarHora)

export default router;
