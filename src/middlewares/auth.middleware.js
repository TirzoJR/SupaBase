import { verificarToken } from '../utils/jwt.utils.js';

// ==========================================
// Middleware de autenticación
// ==========================================

// Este middleware verifica si el usuario
// envió un token JWT válido en la petición.
const authMiddleware = (req, res, next) => {

    // Obtiene el header Authorization
    // enviado desde el cliente.
    const authHeader = req.headers['authorization'];

    // ==========================================
    // Validar existencia y formato del token
    // ==========================================

    // Verifica que exista el header
    // y que tenga el formato:
    // Bearer TOKEN
    if (
        !authHeader ||
        !authHeader.startsWith('Bearer ')
    ) {

        return res.status(401).json({
            ok: false,
            mensaje: 'Acceso denegado. Token no proporcionado.'
        });
    }

    // ==========================================
    // Extraer token
    // ==========================================

    // Se elimina el prefijo "Bearer "
    // para obtener únicamente el token.
    const token = authHeader.split(' ')[1];

    try {

        // ==========================================
        // Verificar token JWT
        // ==========================================

        // Verifica y decodifica el token
        const payload = verificarToken(token);

        // ==========================================
        // Guardar usuario en request
        // ==========================================

        // Se adjunta la información decodificada
        // del usuario al objeto request.
        req.usuario = payload;

        // Continúa con el siguiente middleware
        // o controlador.
        next();

    } catch (error) {

        // ==========================================
        // Manejo de errores
        // ==========================================

        // Muestra error en consola
        console.error(
            'Error verificando token:',
            error.message
        );

        // Verifica si el JWT_SECRET
        // fue cargado correctamente.
        console.error(
            'JWT_SECRET cargado:',
            process.env.JWT_SECRET
                ? ' Sí'
                : ' NO'
        );

        // Retorna error de autenticación
        return res.status(401).json({
            ok: false,
            mensaje: 'Token inválido o expirado.'
        });
    }
};

// ==========================================
// Exportación del middleware
// ==========================================

// Se exporta el middleware para usarlo
// en las rutas protegidas.
export default authMiddleware;