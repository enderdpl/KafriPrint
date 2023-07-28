// zod es una deoendencia que ayuda a las validaciones
import { z } from 'zod'
// aca hacemos el proceso para validar el login y el registro
export const registerSchema= z.object({
    username: z.string({
        required_error: 'username is require'
    }),
    email:z.string({
        required_error:'email es require'
    }).email({
        message: 'invalid email'
    }),
    password: z.string({
        required_error:'password is require'
    }).min(6,{
        message: 'Password de ser mayor de 6 caracteres'
    })
})

export const loginSchema=z.object({
    email: z.string({
        required_error: 'email is require',
    }).email({
        message: ' Email no es valido'
    }),
    password: z.string({
        required_error:'Password is require',

    }).min(6,{
        message:'Contraseña debe tener mas de 6 caracteres'
    })
})