import { supabase } from "../../utils/supabaseCliente.js";
import { generarToken } from "../../utils/jwt.utils.js";
const register = async (req, res) => {
  const { num_control, nombre_completo, contraseña, carrera } = req.body;

  if (!num_control || !nombre_completo || !contraseña || !carrera) {
    return res.status(400).json({
      ok: false,
      mensaje:
        "Todos los campos son obligatorios: num_control, nombre_completo, contraseña, carrera.",
    });
  }
  
  try {
    const { data: resultado, error: errorInsert } = await supabase.rpc(
      "registrar_usuario",
      {
        p_num_control: num_control,
        p_nombre_completo: nombre_completo,
        p_password: contraseña,
        p_carrera: carrera,
      },
    );

    if (errorInsert) throw errorInsert;
    if (!resultado) throw new Error("No se pudo procesar la solicitud del usuario");

    // Evaluamos la respuesta JSON que viene desde la base de datos
    if (resultado.success) {
      return res.status(200).json({
        ok: true,
        // Usamos el mensaje dinámico de Postgres ("Usuario registrado con éxito" o "Usuario actualizado con éxito")
        mensaje: resultado.mensaje || "Operación realizada con éxito.",
        num_control: resultado.num_control,
      });
    } else {
      // Si ocurrió un error controlado dentro del EXCEPTION de Postgres
      return res.status(400).json({
        ok: false,
        mensaje: "Error al procesar en la base de datos.",
        details: resultado.error
      });
    }

  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor.",
    });
  }
};


const login = async (req, res) => {
  const { num_control, contraseña } = req.body;

  if (!num_control || !contraseña) {
    return res.status(400).json({
      ok: false,
      mensaje: "num_control y contraseña son obligatorios.",
    });
  }

  try {
    
    const { data: usuario, error } = await supabase
      .rpc("validar_login", {
        p_num_control: num_control,
        p_password: contraseña,
      })
      .maybeSingle();

    if (error) throw error;

    if (!usuario) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Credenciales incorrectas." });
    }

    const token = generarToken({
      num_control: usuario.num_control,
      nombre_completo: usuario.nombre_completo,
      rol: usuario.rol,
      clave_carrera: usuario.clave_carrera,
    });

    return res.status(200).json({
      ok: true,
      mensaje: "Login exitoso.",
      token,
      usuario: {
        num_control: usuario.num_control,
        nombre_completo: usuario.nombre_completo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor.",
    });
  }
};

const logout = async (req, res) => {
  // num_control y contraseña vienen directamente del body
  const { num_control, contraseña } = req.body;

  if (!num_control || !contraseña) {
    return res.status(400).json({
      ok: false,
      mensaje: "num_control y contraseña son obligatorios.",
    });
  }

  try {
    // Obtener el hash de contraseña del usuario desde la BD
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("contraseña")
      .eq("num_control", num_control)
      .maybeSingle();

    if (error) throw error;

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado.",
      });
    }

    // DEBUG: ver qué regresa Supabase
    console.log("Usuario encontrado:", usuario);

    // Comparar directamente (contraseñas en texto plano)
    const contraseñaValida = contraseña === usuario.contraseña;

    if (!contraseñaValida) {
      return res.status(401).json({
        ok: false,
        mensaje: "Contraseña incorrecta. No se pudo cerrar sesión.",
      });
    }

    // Contraseña correcta → el frontend debe eliminar el token
    return res.status(200).json({
      ok: true,
      mensaje: "Contraseña verificada. Sesión cerrada exitosamente.",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor.",
    });
  }
};

const eliminarUsuario = async (req, res) => {
  const { num_control, nombre_completo, contraseña, carrera } = req.body;

  if (!num_control) {
    return res.status(400).json({
      ok: false,
      mensaje: "El campo num_control es obligatorio.",
    });
  }

  try {
    // Se pasa el body completo; el procedimiento solo usa num_control
    const { data, error } = await supabase.rpc("eliminar_usuario_por_json", {
      p_datos_usuario: { num_control, nombre_completo, contraseña, carrera },
    });

    if (error) throw error;

    // El procedimiento regresa un TEXT que inicia con 'Error' o 'Éxito'
    const fueExitoso = data.startsWith("Éxito");

    return res.status(fueExitoso ? 200 : 400).json({
      ok: fueExitoso,
      mensaje: data,
    });
  } catch (error) {
    console.error("Error en eliminarUsuario:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor.",
    });
  }
};

export { register, login, logout, eliminarUsuario };
