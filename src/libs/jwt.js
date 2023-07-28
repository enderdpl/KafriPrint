// de el archivo confi traemos la llave secreta

import {TOKEN_SECRET} from '../config.js'
import jwt from 'jsonwebtoken'

// esta es la funcion que genera el token solo recibe por parametro el id de el usuario que se logea para generar el pasa de entrada (token )
export function createdAccessToken(payload){

  return new Promise((resolve,reject ) =>{
    jwt.sign(
        payload,
        TOKEN_SECRET,
        {
            expiresIn: "1d"
        },
        (err,token)=>{
            if (err) reject(err)
             
            resolve(token)

        }
        )
  })
}