//importamos mongoose que es el que requerimos para conectar la base de datos a la aplicacion
import mongoose from 'mongoose'
// esta uri es lo que requiere mongodb para conectarse en mi caso use mongodb atlas
const uri= 'mongodb+srv://root:Ender0903@cluster0.2vxatsx.mongodb.net/?retryWrites=true&w=majority'
// la funcion para iniciar la conexion a la db la meto en una variable y esa variable la llamo en index
export const connectDb = async ()=>{
   try{
      await mongoose.connect(uri, { useUnifiedTopology: true })
      console.log('base de Datos conectada')
   }
   catch (error){
    console.log('el error al conectar la base de datos es:', error)
   }
}

 
 