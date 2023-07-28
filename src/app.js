//usando ecmascript 6 llamamos a las dependencias
import express from 'express'
import morgan from 'morgan'
//para poder leer las cokiies que es donde se guarda el token
import cookieParser from 'cookie-parser'
//imporgtamos cors que es para que nos permita conectarnos otro local host ya que el navegador no permite
import cors from "cors";
// importamos con el nombre authRoutes todas las rutas
import authRoutes from './router/auth.routes.js'
import taskRoutes from './router/task.routes.js'

const app= express()

// para ser especifico y deir que se conecte solo con este local host
// app.use(cors({
    
//     origin: 'http://localhost:5173/',
// })) 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
// esto es para que lea el formato json y no de undefine  cuando imprimamos por consola
app.use(express.json())
app.use(cookieParser())
// aca activamos todas la rutas y decimos que todas tengan el prefijo /api 
app.use('/api',authRoutes)
app.use('/api',taskRoutes)



export default app;