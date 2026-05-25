import { supabase } from "../../utils/supabaseCliente.js";

const Obtenertodo = async (req,res) =>{
    const {data,error} = await supabase.rpc("todo_carrera");
    if(error) return res.status(400).json({error:error.message})
    if(!data) return res.status(404).json({erro: "Sin Datos"})
    res.json(data);

}

const BitacoraFecha = async (req,res) =>{
    const fecha = req.params.fecha;
    const {data,error} = await supabase.rpc("bitacora_fecha",{
        p_fecha : fecha,
    }); 
    
    if(error)
        return res.status(400).json({erro:error.message})
    res.json(data)
}

const RegistrarBitacora = async (req, res) => {
    const {
        fecha,
        nombre_docente,
        materia,
        carrera,
        practica_nombre,
        unidad,
        registrada,
        alumnos_atendidos,
        hora_entrada,
        hora_salida,
        laboratorio,
        firma,
    } = req.body;

    const camposFaltantes = [];
    if (!fecha) camposFaltantes.push("fecha");
    if (!nombre_docente) camposFaltantes.push("nombre_docente");
    if (!materia) camposFaltantes.push("materia");
    if (!carrera) camposFaltantes.push("carrera");
    if (!practica_nombre) camposFaltantes.push("practica_nombre");
    if (!unidad) camposFaltantes.push("unidad");
    if (!registrada) camposFaltantes.push("registrada");
    if (!alumnos_atendidos) camposFaltantes.push("alumnos_");
    if (!laboratorio) camposFaltantes.push("laboratorio");
    if (!hora_entrada) camposFaltantes.push("hora_entrada");
    if (!hora_salida) camposFaltantes.push("hora_salida");
    if (!firma) camposFaltantes.push("firma");

    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            ok: false,
            mensaje: `Faltan campos requeridos: ${camposFaltantes.join(", ")}.`,
        });
    }

    try {
        const { data, error } = await supabase.rpc("registrar_bita", {
            p_fecha: fecha,
            p_nombre_docente: nombre_docente,
            p_materia: materia,
            p_practica_nombre: practica_nombre,
            p_unidad: unidad,
            p_registrada: registrada,
            p_alumnos_atendidos: alumnos_atendidos,
            p_hora_entrada: hora_entrada,
            p_hora_salida: hora_salida,
            p_laboratorio: laboratorio,
            p_firma: firma,
            p_carrera: carrera,
        });

        if (error) return res.status(400).json({ ok: false, mensaje: error.message });
        return res.status(201).json({ ok: true, mensaje: "Bitácora registrada.", data });
    } catch (error) {
        console.error("Error en RegistrarBitacora:", error);
        return res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
}

const maestros = async (req, res) => {
    try {
        const { data, error } = await supabase.rpc("obt_maestros")

        if (error) throw error;

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error al obtener maestros:", error.message);
        
        return res.status(500).json({ 
            error: "Hubo un problema al obtener los datos",
            details: error.message 
        });
    }
};

const obtener_maestros = async(req,res)=>{
     try {
        const { data, error } = await supabase.rpc("obtener_maestros")

        if (error) throw error;

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error al obtener maestros:", error.message);
        
        return res.status(500).json({ 
            error: "Hubo un problema al obtener los datos",
            details: error.message 
        });
    }
};

export default {Obtenertodo,BitacoraFecha,RegistrarBitacora,maestros,obtener_maestros}