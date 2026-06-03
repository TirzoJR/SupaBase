// ==========================================
// Importaciones principales
// ==========================================

// Carga automáticamente las variables
// de entorno desde el archivo .env
import "dotenv/config";

// Framework principal del servidor
import express from "express";

// Middleware para permitir peticiones
// desde otros dominios.
import cors from "cors";

// Middleware de seguridad para Express.
import helmet from "helmet";

// ==========================================
// Importación de rutas
// ==========================================

// Rutas de autenticación
import authRoutes from "./modules/auth/auth.routes.js";

// Rutas de horarios
import horariosRoutes from "./modules/horarios/horarios.routes.js";

// Rutas de bitácora
import bitacoraRoutes from "./modules/bitacora/bitacora.routes.js";

// Rutas de estadísticas
import estadisticasRoutes from "./modules/bitacora/estadisticas.routes.js";

// ==========================================
// Inicialización de la aplicación
// ==========================================

// Se crea una instancia de Express
const app = express();

// ==========================================
// Middlewares globales
// ==========================================

// Helmet agrega cabeceras de seguridad
// para proteger la aplicación.
app.use(helmet());

// Permite solicitudes desde otros orígenes
app.use(cors());

// Permite recibir y procesar datos JSON
app.use(express.json());

// ==========================================
// Ruta principal
// ==========================================

// Ruta básica para comprobar
// si la API está funcionando.
app.get("/", (req, res) => {

  res.json({
    ok: true,
    mensaje: "API funcionando correctamente"
  });
});

// ==========================================
// Rutas públicas
// ==========================================

// Rutas relacionadas con autenticación.
// Ejemplo: login y registro.
app.use("/api/", authRoutes);

// ==========================================
// Rutas privadas
// ==========================================

// Rutas de horarios.
// El middleware de autenticación
// se maneja dentro del router.
app.use(
  "/api/horarios",
  horariosRoutes
);

// Rutas de bitácora
app.use(
  "/api/bitacora",
  bitacoraRoutes
);

// Rutas de estadísticas
app.use(
  '/api/estadisticas',
  estadisticasRoutes
);

// ==========================================
// Middleware 404
// ==========================================

// Se ejecuta cuando la ruta
// no existe en el servidor.
app.use((req, res) => {

  res.status(404).json({
    ok: false,
    mensaje: `Ruta '${req.originalUrl}' no encontrada.`
  });
});

// ==========================================
// Middleware de errores global
// ==========================================

// Captura errores no controlados
// en toda la aplicación.
app.use((err, req, res, next) => {

  // Manejo de errores de JSON inválido
  if (err.status === 400 && err.expose) {

    return res.status(400).json({
      ok: false,
      mensaje: "El body de la petición no es JSON válido."
    });
  }

  // Muestra el error en consola
  console.error("Error no manejado:", err);

  // Retorna error genérico
  res.status(500).json({
    ok: false,
    mensaje: "Error interno del servidor."
  });
});

// ==========================================
// Inicialización del servidor
// ==========================================

// Puerto del servidor.
// Si no existe en .env, usa el 3000.
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {

  console.log(
    `Servidor ejecutándose en el puerto ${PORT}`
  );

  // Verifica si el JWT_SECRET existe
  console.log(
    `JWT Secret: ${
      process.env.JWT_SECRET
        ? "Cargado"
        : "NO encontrado"
    }`
  );
});