// ==========================================
// Definición de roles válidos del sistema
// ==========================================

// Objeto que almacena los roles permitidos
// dentro de la aplicación.
const ROLES = {
    ADMINISTRADOR: 'administrador',
    AYUDANTE_ADMIN: 'ayudante_admin',
    BITACORA: 'bitacora',
};

// ==========================================
// Middleware para verificar roles
// ==========================================

// Esta función recibe uno o varios roles permitidos
// y retorna un middleware para validar permisos.
const verificarRol = (...rolesPermitidos) => {

    // Middleware de Express
    return (req, res, next) => {

        // Obtiene el rol del usuario autenticado
        // usando optional chaining para evitar errores.
        const rolUsuario = req.usuario?.rol;

        // Verifica si el usuario tiene un rol asignado
        if (!rolUsuario) {

            // Si no existe el rol, se devuelve error 403
            // indicando que no se pudo validar.
            return res.status(403).json({
                ok: false,
                mensaje: 'No se pudo determinar el rol del usuario.'
            });
        }

        // Comprueba si el rol del usuario
        // está dentro de los roles permitidos.
        const tienePermiso = rolesPermitidos.includes(rolUsuario);

        // Si el usuario no tiene permisos
        if (!tienePermiso) {

            // Retorna un error de acceso denegado
            return res.status(403).json({
                ok: false,
                mensaje: `Acceso denegado. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}.`
            });
        }

        // Si el usuario tiene permisos,
        // continúa con la siguiente función.
        next();
    };
};

// Exportación del middleware y los roles
// para poder utilizarlos en otros archivos.
export default { verificarRol, ROLES };