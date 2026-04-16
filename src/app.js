const express = require('express');
const cors = require('cors');

// Inicializar la aplicación
const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones de otros puertos/dominios
app.use(express.json()); // Permite a la API entender formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'El servidor de la API está funcionando correctamente.' });
});

// Configurar el puerto y encender el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});