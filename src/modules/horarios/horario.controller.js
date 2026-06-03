import { supabase } from "../../utils/supabaseCliente.js";

// ==========================================
// Obtener horario de laboratorio
// ==========================================

// Función que obtiene el horario
// de un laboratorio específico.
const obtenerLab = async (req, res) => {

    // Convierte el parámetro a número entero
    const laboratorio = parseInt(req.params.laboratorio);

    // Verifica que el valor sea numérico
    if (isNaN(laboratorio)) {

        return res.status(400).json({
            error: "El id del laboratorio debe ser un número"
        });
    }

    // Llamada al procedimiento almacenado
    const { data, error } = await supabase.rpc(
        'horario_lab',
        {
            nombre_lab_busqueda: laboratorio
        }
    );

    // Verifica errores
    if (error)
        return res.status(400).json({
            error: error.message
        });

    // Retorna los datos encontrados
    return res.json(data);
};

// ==========================================
// Registrar horarios
// ==========================================

// Función encargada de registrar
// horarios de laboratorios.
const registroHorario = async (req, res) => {

    try {

        // Obtiene los datos enviados desde el body
        const horario = req.body;

        // Verifica que se reciba un arreglo
        if (!Array.isArray(horario)) {

            return res.status(400).json({
                error: "Se espera un arreglo de horario"
            });
        }

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            "insert_laboratorio",
            {
                p_horarios_json: horario
            }
        );

        // Verifica errores del servidor
        if (error) {

            return res.status(500).json({
                error: 'error en el servidor'
            });
        }

        // Si algunos horarios no se pudieron agregar
        if (data && data.length > 0) {

            return res.status(207).json({
                message: 'algunos horarios no se pudieron agregar',
                detalle: data
            });
        }

        // Respuesta exitosa
        res.status(200).json({
            message: 'Los horarios de agregaron correctamente'
        });

    } catch (error) {

        // Muestra errores en consola
        console.log('Error en la ruta', error);

        // Retorna error inesperado
        res.status(500).json({
            error: 'Ocurrio un error inesperado'
        });
    }
};

// ==========================================
// Obtener materias únicas
// ==========================================

// Función que obtiene las materias
// registradas en la base de datos.
const materias = async (req, res) => {

    try {

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            "obtener_materias_unicas"
        );

        // Verifica errores
        if (error) throw error;

        // Retorna datos obtenidos
        return res.status(200).json(data);

    } catch (error) {

        // Muestra error en consola
        console.error(
            "Error al obtener las materias:",
            error.message
        );

        // Retorna error al cliente
        return res.status(500).json({
            error: "Hubo un problema al obtener los datos",
            details: error.message
        });
    }
};

// ==========================================
// Eliminar horario
// ==========================================

// Función que elimina un horario
// de la base de datos.
const elimminarHora = async (req, res) => {

    try {

        // Obtiene los datos enviados desde el body
        const horario = req.body;

        // Llamada al procedimiento almacenado
        const { data, error } = await supabase.rpc(
            "eliminar_hora_horario",
            {
                p_json: horario
            }
        );

        // Verifica errores
        if (error)

            return res.status(500).json({
                error: 'error en el servidor'
            });

        // Si la operación fue exitosa
        if (data.success) {

            return res.status(200).json(data);

        } else {

            // Si ocurrió algún problema
            return res.status(400).json(data);
        }

    } catch (error) {

        // Muestra error en consola
        console.log('Error en la ruta', error);

        // Retorna error inesperado
        res.status(500).json({
            error: 'Ocurrio un error inesperado'
        });
    }
};

// ==========================================
// Exportación de funciones
// ==========================================

// Se exportan todas las funciones
// para ser utilizadas en las rutas.
export default {
    obtenerLab,
    registroHorario,
    materias,
    elimminarHora
};