// importamos Router  y los metodos de controladores para unirlos a las rutas segun sea post o get
import {Router} from 'express'
import {login , register,logout,profile,verifyToken} from '../controllers/auth.controller.js'
import {authRequire} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema,loginSchema} from '../schemas/auth.schema.js'
const router= Router()
 
router.post('/register',validateSchema(registerSchema) , register)
router.post('/login',validateSchema(loginSchema) ,login)
router.post('/logout', logout )
//cada vez que el usuario haga petecion envie en token para ver si puede acceder
router.get('/verify', verifyToken )
router.get('/profile', authRequire,profile )

// exportamos este router para recibirlo el app
export default router
