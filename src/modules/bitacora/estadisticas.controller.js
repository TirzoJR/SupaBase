import { supabase } from '../../utils/supabaseCliente.js';

// ==========================================
// Obtener horas por carrera
// ==========================================

// Función que calcula las horas acumuladas
// por carrera en un rango de fechas.
export const getHorasPorCarrera = async (req, res) => {

    try {

        // Se obtienen las fechas desde los query params
        const { fecha_inicio, fecha_fin } = req.query;

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            'get_horas_por_carrera',
            {
                p_fecha_inicio: fecha_inicio,
                p_fecha_fin: fecha_fin
            }
        );

        // Si ocurre un error, se lanza excepción
        if (error) throw error;

        // Retorna respuesta exitosa
        res.json({
            ok: true,
            data
        });

    } catch (error) {

        // Muestra error en consola
        console.error("Error en getHorasPorCarrera:", error);

        // Retorna error al cliente
        res.status(500).json({
            ok: false,
            error: "Error al calcular horas por carrera",
            detalle: error.message
        });
    }
};

// ==========================================
// Obtener uso de laboratorios
// ==========================================

// Función que obtiene el uso de laboratorios
// en un rango de fechas.
export const getUsoLaboratorios = async (req, res) => {

    try {

        // Obtiene las fechas enviadas por query
        const { fecha_inicio, fecha_fin } = req.query;

        // Llama al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            'get_uso_laboratorios',
            {
                p_fecha_inicio: fecha_inicio,
                p_fecha_fin: fecha_fin
            }
        );

        // Verifica errores
        if (error) throw error;

        // Retorna los datos
        res.json({
            ok: true,
            data
        });

    } catch (error) {

        // Muestra error en consola
        console.error("Error en getUsoLaboratorios:", error);

        // Retorna mensaje de error
        res.status(500).json({
            ok: false,
            error: "Error al obtener uso de laboratorios",
            detalle: error.message
        });
    }
};

// ==========================================
// Obtener horas de un docente por materia
// ==========================================

// Función que consulta las horas impartidas
// por un docente en determinada materia.
export const getHorasDocentePorMateria = async (req, res) => {

    try {

        // Obtiene el ID del maestro desde la URL
        const { maestro_id } = req.params;

        // Obtiene las fechas desde query params
        const { fecha_inicio, fecha_fin } = req.query;

        // Llama al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            'get_horas_docente_por_materia',
            {
                p_maestro_id: maestro_id,
                p_fecha_inicio: fecha_inicio,
                p_fecha_fin: fecha_fin
            }
        );

        // Verifica errores
        if (error) throw error;

        // Retorna los resultados
        res.json({
            ok: true,
            data
        });

    } catch (error) {

        // Muestra error en consola
        console.error("Error en getHorasDocente:", error);

        // Retorna error al cliente
        res.status(500).json({
            ok: false,
            error: "Error al consultar al docente",
            detalle: error.message
        });
    }
};

// ==========================================
// Obtener horas de una materia por periodo
// ==========================================

// Función que consulta las horas registradas
// de una materia en un periodo específico.
export const getHorasMateriaPorPeriodo = async (req, res) => {

    try {

        // Obtiene la materia desde la URL
        const { materia } = req.params;

        // Obtiene fechas desde query params
        const { fecha_inicio, fecha_fin } = req.query;

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            'get_horas_materia_por_periodo',
            {
                p_materia: materia,
                p_fecha_inicio: fecha_inicio,
                p_fecha_fin: fecha_fin
            }
        );

        // Verifica errores
        if (error) throw error;

        // Retorna datos obtenidos
        res.json({
            ok: true,
            data
        });

    } catch (error) {

        // Muestra error en consola
        console.error("Error en getHorasMateria:", error);

        // Retorna error al cliente
        res.status(500).json({
            ok: false,
            error: "Error al filtrar por periodo",
            detalle: error.message
        });
    }
};

// ==========================================
// Obtener uso detallado de laboratorio
// ==========================================

// Función que obtiene un desglose detallado
// del uso de un laboratorio específico.
export const getUsoLaboratorioDetallado = async (req, res) => {

    try {

        // Obtiene el ID del laboratorio desde la URL
        const { laboratorio_id } = req.params;

        // Obtiene las fechas desde query params
        const { fecha_inicio, fecha_fin } = req.query;

        // Verifica que las fechas existan
        if (!fecha_inicio || !fecha_fin) {

            return res.status(400).json({
                ok: false,
                mensaje: "Las fechas son obligatorias."
            });
        }

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            'get_uso_laboratorio_detallado',
            {
                p_laboratorio: parseInt(laboratorio_id),
                p_fecha_inicio: fecha_inicio,
                p_fecha_fin: fecha_fin
            }
        );

        // Verifica errores
        if (error) throw error;

        // Retorna datos obtenidos
        res.json({
            ok: true,
            data
        });

    } catch (error) {

        // Muestra error en consola
        console.error("Error en getUsoLaboratorioDetallado:", error);

        // Retorna error al cliente
        res.status(500).json({
            ok: false,
            error: "Error al obtener el desglose del laboratorio",
            detalle: error.message
        });
    }
};