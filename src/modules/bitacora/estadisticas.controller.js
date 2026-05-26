import { supabase } from '../../utils/supabaseCliente.js';

export const getHorasPorCarrera = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query; // Capturamos las fechas
        const { data, error } = await supabase.rpc('get_horas_por_carrera', {
            p_fecha_inicio: fecha_inicio,
            p_fecha_fin: fecha_fin
        });
        if (error) throw error;
        res.json({ ok: true, data });
    } catch (error) {
        console.error("Error en getHorasPorCarrera:", error);
        res.status(500).json({ ok: false, error: "Error al calcular horas por carrera", detalle: error.message });
    }
};

export const getUsoLaboratorios = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        const { data, error } = await supabase.rpc('get_uso_laboratorios', {
            p_fecha_inicio: fecha_inicio,
            p_fecha_fin: fecha_fin
        });
        if (error) throw error;
        res.json({ ok: true, data });
    } catch (error) {
        console.error("Error en getUsoLaboratorios:", error);
        res.status(500).json({ ok: false, error: "Error al obtener uso de laboratorios", detalle: error.message });
    }
};

export const getHorasDocentePorMateria = async (req, res) => {
    try {
        const { maestro_id } = req.params;
        const { fecha_inicio, fecha_fin } = req.query;
        const { data, error } = await supabase.rpc('get_horas_docente_por_materia', {
            p_maestro_id: maestro_id,
            p_fecha_inicio: fecha_inicio,
            p_fecha_fin: fecha_fin
        });
        
        if (error) throw error;
        res.json({ ok: true, data });
    } catch (error) {
        console.error("Error en getHorasDocente:", error);
        res.status(500).json({ ok: false, error: "Error al consultar al docente", detalle: error.message });
    }
};

export const getHorasMateriaPorPeriodo = async (req, res) => {
    try {
        const { materia } = req.params;
        const { fecha_inicio, fecha_fin } = req.query; 
        
        const { data, error } = await supabase.rpc('get_horas_materia_por_periodo', {
            p_materia: materia,
            p_fecha_inicio: fecha_inicio,
            p_fecha_fin: fecha_fin
        });

        if (error) throw error;
        res.json({ ok: true, data });
    } catch (error) {
        console.error("Error en getHorasMateria:", error);
        res.status(500).json({ ok: false, error: "Error al filtrar por periodo", detalle: error.message });
    }
};