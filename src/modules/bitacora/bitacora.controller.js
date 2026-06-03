import { supabase } from "../../utils/supabaseCliente.js";

// ==========================================
// Obtener todas las carreras
// ==========================================

// Función que consulta todas las carreras
// utilizando una función RPC de Supabase.
const Obtenertodo = async (req, res) => {

    // Llamada al procedimiento almacenado "todo_carrera"
    const { data, error } = await supabase.rpc("todo_carrera");

    // Verifica si ocurrió un error
    if (error)
        return res.status(400).json({
            error: error.message
        });

    // Verifica si no existen datos
    if (!data)
        return res.status(404).json({
            erro: "Sin Datos"
        });

    // Retorna los datos obtenidos
    res.json(data);
};

// ==========================================
// Obtener bitácoras por fecha
// ==========================================

// Función que obtiene registros de bitácora
// filtrando por una fecha específica.
const BitacoraFecha = async (req, res) => {

    // Obtiene la fecha desde los parámetros de la URL
    const fecha = req.params.fecha;

    // Llama al procedimiento almacenado
    // enviando la fecha como parámetro
    const { data, error } = await supabase.rpc("bitacora_fecha", {
        p_fecha: fecha,
    });

    // Verifica si ocurrió un error
    if (error)
        return res.status(400).json({
            erro: error.message
        });

    // Retorna los datos encontrados
    res.json(data);
};

// ==========================================
// Registrar una nueva bitácora
// ==========================================

// Función encargada de registrar una bitácora
// en la base de datos.
const RegistrarBitacora = async (req, res) => {

    // Se obtienen los datos enviados desde el body
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

    // Arreglo para almacenar campos faltantes
    const camposFaltantes = [];

    // Validación de campos obligatorios
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

    // Si existen campos faltantes,
    // retorna un mensaje de error
    if (camposFaltantes.length > 0) {

        return res.status(400).json({
            ok: false,
            mensaje: `Faltan campos requeridos: ${camposFaltantes.join(", ")}.`,
        });
    }

    try {

        // Llamada al procedimiento almacenado
        // para registrar la bitácora
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

        // Verifica si ocurrió un error
        if (error)
            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });

        // Retorna respuesta exitosa
        return res.status(201).json({
            ok: true,
            mensaje: "Bitácora registrada.",
            data
        });

    } catch (error) {

        // Captura errores internos del servidor
        console.error("Error en RegistrarBitacora:", error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error interno del servidor."
        });
    }
};

// ==========================================
// Obtener maestros
// ==========================================

// Función para obtener la lista de maestros
// desde Supabase.
const maestros = async (req, res) => {

    try {

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc("obt_maestros");

        // Si existe error, lo lanza
        if (error) throw error;

        // Retorna los datos obtenidos
        return res.status(200).json(data);

    } catch (error) {

        // Muestra el error en consola
        console.error("Error al obtener maestros:", error.message);

        // Retorna error del servidor
        return res.status(500).json({
            error: "Hubo un problema al obtener los datos",
            details: error.message
        });
    }
};

// ==========================================
// Obtener maestros (segunda consulta)
// ==========================================

// Función que obtiene maestros usando
// otro procedimiento almacenado.
const obtener_maestros = async (req, res) => {

    try {

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc("obtener_maestros");

        // Si existe error, lo lanza
        if (error) throw error;

        // Retorna los datos encontrados
        return res.status(200).json(data);

    } catch (error) {

        // Muestra el error en consola
        console.error("Error al obtener maestros:", error.message);

        // Retorna error del servidor
        return res.status(500).json({
            error: "Hubo un problema al obtener los datos",
            details: error.message
        });
    }
};

// ==========================================
// Exportación de funciones
// ==========================================

// Se exportan todas las funciones
// para poder utilizarlas en las rutas.
export default {
    Obtenertodo,
    BitacoraFecha,
    RegistrarBitacora,
    maestros,
    obtener_maestros
};