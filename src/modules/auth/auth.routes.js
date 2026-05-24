// auth.routes.js corregido
import { Router } from 'express';
import { register, login, logout, eliminarUsuario } from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import rolesMiddleware from '../../middlewares/roles.middleware.js';  // ← un solo import

const { verificarRol, ROLES } = rolesMiddleware;  // ← destructuring correcto

const router = Router();

// POST /register — Solo admins pueden crear usuarios
router.post('/registrar_docentes', register);

// POST /login — Pública, sin token
router.post('/login', login);

// POST /logout — Requiere token válido + contraseña del usuario
router.post('/logout', logout);

// DELETE /eliminar_usuario — Solo admins pueden eliminar usuarios
router.delete('/eliminar_usuario', eliminarUsuario);

export default router;

