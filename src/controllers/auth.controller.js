// aca recibimos el nombre de la tabla y su instancia
import user from '../models/user.model.js'
//importamos el modulo para encriptar contraseña
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import {createdAccessToken} from '../libs/jwt.js' 


export const register=  async (req,res) => {
   const {email, password, username}= req.body
    try {
        //aca validamos el que el correo no exista
        const userFound= await user.findOne({email})
        if(userFound) return res.status(400).json(["Este email ya existe"])
        //la encriptamos de esta forma
        const passhash =  await bcrypt.hash(password,10)
        //para usar los valores de req.body y manejarlo mejor lo instanciamos como parte d ela tabla user que creamos
        const newUser= new user ({
            
            username,
            email,
            //para que guarde la contraseña encriptada
            password: passhash
           })
           
           //lo que guardamos lo metemos en una variable
        const userSaved= await newUser.save()
        // llamamos a la funcion en lib que genera el token y eso que genera lo guardamos el la variable token y le pasamos lo que queremos que identifica segun el usuario que entre que es el id
        const token = await createdAccessToken({id : userSaved._id})
            //guardamos el token en la cookie para que se pueda acceder mas facil mas adelante
        res.cookie('token', token)
          //antes se tenia asi "res.json(userSaved)"" y esto nos enviamos toda la informacion como rrespuesta asi que ahora lo hacemos de este modo para que nos envie solo el id,username, email

           res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
           })
 

        
            // res.json({
            //     message:"user created successfully" })
           //generamos el pase de entrada(token) asi tal cual con jwt.sign(), para generarlo necesita algo unico para guardarlo como el (id),necesita una llave secreta de tipo string(secret123),y necesita el tiempo de expiracion de este pase,para hacerlo asincrona generamos el (err,token) y si genera el token sin problema lo devuelve

           //esto esta bien pero para organizarlo mejor se lo llevan a libs y hacen promesa
           
        // jwt.sign(
        // {
            
        //     id:userSaved._id,
        // },
        //     'secret123',
        // {
        //     expiresIn: "1d"
        // },
        // (err,token)=>{
        //     if (err) console.log(err)

            //guardamos el token en la cookie para que se pueda acceder mas facil mas adelante
            // res.cookie('token', token)
            // res.json({
            //     message:"user created successfully"
        //     })
        // }
        // )
        
        
         
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

   
} ;
 
export const login =  async (req,res) => {
    //solo necesitamos email y pass
    const {email, password}= req.body
     try {
        //para buscar a el usuario que se registra 
        const userFound= await user.findOne ({email})
        
        if (!userFound ) return res.status(400).json({message: 'user not found'})
         // realizo la comparacion de las contraseña la que ingresa y la que encuentra atravez de su correo
         const isMatch =  await bcrypt.compare(password,userFound.password)

         if(!isMatch)return res.status(400).json({message: 'incorrect password'})
         // generamos un token con la persona login
         const token = await createdAccessToken({id : userFound._id})
            
         res.cookie('token', token)
            res.json({
             id: userFound._id,
             username: userFound.username,
             email: userFound.email,
            })  
     } catch (error) {
         res.status(500).json({message:error.message})
     }
 
    
 } ;

export const logout = (req,res) =>{
    res.cookie('token','',{
        expires: new Date(0)
    } )
    return res.sendStatus(200)
}

export const profile= async (req,res)=>{

    const userFound= await user.findById(req.user.id)
    if(!userFound) req.status(400).json({
        message: 'user not found'
    })
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
       })
}

export const verifyToken= async (req,res)=>{
    const { token }= req.cookies
    if(!token) return res.status(401).json({message: 'Usuario No Autorizado'})
    jwt.verify(token,TOKEN_SECRET,async (err,User)=>{
        if (err) return res.status(401).json({message: 'No autorizado'})
        const userFound= await user.findById(User.id)
        if(!userFound) return res.status(401).json({message: 'No autorizado'})
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}

