import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'
// el next hace es que en vez de retornar una respuesta al cliente solo continue ya que hay otra funcion que espera a ejecutarse despues de esta
export const authRequire= (req,res,next)=>{
    const { token } = req.cookies

    if(!token)
     return res.status(401).json({message:'no token,autorizacion denegada'})

    //una vez se hay un token lo tengo que verificar si es uno creado por mi por eso llamo a la funcion verify con mi llave secreta de congi.js
    jwt.verify(token,TOKEN_SECRET, (err,user) =>{
        if (err) return res.status(403).json({message: "invalid token"})
        req.user= user
        next()
    })

  
}