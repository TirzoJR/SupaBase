import { createClient } from '@supabase/supabase-js';

// ==========================================
// Variables de entorno de Supabase
// ==========================================

// URL del proyecto de Supabase.
// Se obtiene desde el archivo .env
const supabaseUrl = process.env.SUPABASE_URL;

// Clave pública (anon key) de Supabase.
// También se obtiene desde las variables
// de entorno para mayor seguridad.
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// ==========================================
// Creación del cliente Supabase
// ==========================================

// Se crea una instancia del cliente
// de Supabase utilizando la URL
// y la clave del proyecto.
export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);