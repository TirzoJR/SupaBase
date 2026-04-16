const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Prueba de conexión al iniciar
pool.connect()
    .then(client => {
        console.log('Conexión exitosa a la base de datos en Render');
        client.release();
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err.stack);
    });

module.exports = pool;