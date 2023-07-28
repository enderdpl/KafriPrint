//importamos app para que levantar el servidor desde aqui
import app from './app.js'
//importamos la funcion de connectDb que es donde se hace la conexion a la base de datos
import {connectDb} from './db.js'
connectDb();
app.listen(3000)
console.log('server on port ', 3000)