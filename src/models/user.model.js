// usaremos el mongoose para hacer el modelo de base de datos
import mongoose from "mongoose";

//asi se trabaja en mongodb con modelos de esquemas e instancias osea aca es donde se crean las los datos que tendra la tabla
const userSchemas= new mongoose.Schema({
    username: {
        type: String,
        require:true,
        // es para que cuando el usuario coloque algo de mas espacio y cualquier cosa los elimine
        trim: true

    },
    email:{
        type: String,
        require:true,
        trim: true,
        unique:true

    },
    password:{
        type: String, 
        require:true

    },
   
},
 {      // para que nos agregue automaticamente el created at y update ap
        timestamps: true
    })

// exportamos el esquema y le damos el nombre de la tabla sera "user" en este caso
export default mongoose.model('User',userSchemas)