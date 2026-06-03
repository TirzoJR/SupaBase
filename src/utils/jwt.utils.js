import jwt from 'jsonwebtoken';

// ==========================================
// Variables de entorno
// ==========================================

// Clave secreta utilizada para firmar
// y verificar los tokens JWT.
const SECRET = process.env.JWT_SECRET;

// Tiempo de expiración del token.
// Si no existe en las variables de entorno,
// se asigna "7d" por defecto.
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// ==========================================
// Generar token JWT
// ==========================================

// Función encargada de generar un token
// utilizando la librería jsonwebtoken.
const generarToken = (payload) => {

    // jwt.sign crea un token firmado
    // con la información del usuario.
    return jwt.sign(
        payload,
        SECRET,
        {
            expiresIn: EXPIRES_IN
        }
    );
};

// ==========================================
// Verificar token JWT
// ==========================================

// Función que verifica si el token
// es válido y no ha expirado.
const verificarToken = (token) => {

    // jwt.verify valida el token
    // usando la clave secreta.
    return jwt.verify(token, SECRET);
};

// ==========================================
// Exportación de funciones
// ==========================================

// Se exportan las funciones para poder
// utilizarlas en otros archivos.
export {
    generarToken,
    verificarToken
};