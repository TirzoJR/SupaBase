import  { verificarToken } from '../utils/jwt.utils.js';


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar que el header exista y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Acceso denegado. Token no proporcionado.'
        });
    }

    // Extraer el token (quitar el prefijo "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verificar y decodificar el token
        const payload = verificarToken(token);

        // Adjuntar el usuario decodificado a la request para usarlo en los controllers
        req.usuario = payload;

        next(); // Pasar al siguiente middleware o controller
    } catch (error) {
        console.error('Error verificando token:', error.message);
        console.error('JWT_SECRET cargado:', process.env.JWT_SECRET ? ' Sí' : ' NO');
        return res.status(401).json({
            ok: false,
            mensaje: 'Token inválido o expirado.'
        });
    }
};

export default authMiddleware;
