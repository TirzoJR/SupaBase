import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes.js";
import horariosRoutes from "./modules/horarios/horarios.routes.js";
import bitacoraRoutes from "./modules/bitacora/bitacora.routes.js";
import estadisticasRoutes from "./modules/bitacora/estadisticas.routes.js";
const app = express();

//  Middlewares globales 
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, mensaje: "API funcionando correctamente" });
});

//  Rutas públicas 
app.use("/api/", authRoutes);     

//  Rutas privadas (el authMiddleware está dentro de cada router) 
app.use("/api/horarios", horariosRoutes);  
app.use("/api/bitacora", bitacoraRoutes);  
app.use('/api/estadisticas', estadisticasRoutes);
//  404 
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: `Ruta '${req.originalUrl}' no encontrada.` });
});

//  Error global 
app.use((err, req, res, next) => {

  if (err.status === 400 && err.expose) {
    return res.status(400).json({ ok: false, mensaje: "El body de la petición no es JSON válido." });
  }
  console.error("Error no manejado:", err);
  res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
});

//  Arrancar servidor 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Cargado" : "NO encontrado"}`);
});
