import { supabase } from "../../utils/supabaseCliente.js";

const obtenerLab = async (req,res)=>{
    const laboratorio = parseInt(req.params.laboratorio);
    if (isNaN(laboratorio)) return res.status(400).json({ error: "El id del laboratorio debe ser un número" });
    const {data,error} = await supabase.rpc('horario_lab',{nombre_lab_busqueda: laboratorio})

    if(error) return res.status(400).json({error: error.message})
    return res.json(data)
}
const registroHorario = async (req,res)=>{
    try {
        const horario = req.body;
        if(!Array.isArray(horario)){
            return res.status(400).json({error: "Se espera un arreglo de horario"})
        }

        const {data,error}=await supabase.rpc("insert_laboratorio",{
            p_horarios_json: horario
        })

        if(error){
        return res.status(500).json({error:'error en el servidor'})
        }
        if(data && data.length >0){
        return res.status(207).json({message:'algunos horarios no se pudieron agregar ',
            detalle:data})
        }

        res.status(200).json({message:'Los horarios de agregaron correctamente'})
        
    } catch (error) {
       console.log('Error en la ruta',error) 
       res.status(500).json({error:'Ocurrio un error inesperado'})
    }
}

const materias = async (req, res) => {
    try {
        const { data, error } = await supabase.rpc("obtener_materias_unicas")
        if (error) throw error;

        return res.status(200).json(data);
        
    } catch (error) {
        console.error("Error al obtener las materias:", error.message);
        
        return res.status(500).json({ 
            error: "Hubo un problema al obtener los datos",
            details: error.message 
        });
    }
}

const elimminarHora= async(req,res) => {
    try {
        const horario = req.body

        const {data,error} = await supabase.rpc("eliminar_hora_horario",{
            p_json:horario
        })
        
        if(error)
            return res.status(500).json({error:'error en el servidor'})

    
        if(data.success){
            return res.status(200).json(data)
        }
        else{
            return res.status(400).json(data)
        }

    } catch (error) {
        console.log('Error en la ruta',error) 
       res.status(500).json({error:'Ocurrio un error inesperado'})
    }

}

export default {obtenerLab,registroHorario,materias,elimminarHora}