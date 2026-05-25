// Roles válidos en el sistema
const ROLES = {
    ADMINISTRADOR: 'administrador',
    AYUDANTE_ADMIN: 'ayudante_admin',
    BITACORA: 'bitacora',

};

const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        
        const rolUsuario = req.usuario?.rol;
        if (!rolUsuario) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No se pudo determinar el rol del usuario.'
            });
        }
        const tienePermiso = rolesPermitidos.includes(rolUsuario);

        if (!tienePermiso) {
            return res.status(403).json({
                ok: false,
                mensaje: `Acceso denegado. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}.`
            });
        }
        next(); 
    };
};

export default { verificarRol, ROLES };
