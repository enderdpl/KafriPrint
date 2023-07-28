//usamos useefeect para crear una funcion que borro el mensaje pasado un tiempo
import { createContext, useContext, useState,useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth"; 
// esto es para que el front pueda leer las cookies y a la hora de iniciar sesion se guarde ese token o cookie a al cambiar de pagina se mantenga la sesion abierta
import Cookies from "js-cookie";

export const authContext=createContext()

export const useAuth=()=>{
    const contex=useContext(authContext);
    if(!contex){
        throw new Error("useAuth must be use within an AuthProvider");
        
    }
    return contex;
}
export const AuthProvider= ({ children })=>{
    const [user, setUser]=useState(null)
    const [isAuthenticate, setIsAuthenticate]= useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    
    const signup=async(user)=>{
        try {
            const res= await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticate(true)

            
        } catch (error) {
            
            setErrors(error.response.data)
        }

        
    };

    const signin= async (user)=>{
        try {
           const res = await loginRequest(user)
           console.log(res)
           setIsAuthenticate(true)
           setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }
    const logout= () =>{
        Cookies.remove("token")
        setIsAuthenticate(false)
        setUser(null)
    }
//PARA que los errores solo duren 4 segundo y desaparezcan 
    useEffect(()=>{
        if (errors.length > 0){
            const timer= setTimeout(() => {
                setErrors([])
            }, 4000);
            return ()=> clearTimeout(timer)
        }
    },[errors])

    useEffect(() => {
        async function checkLogin () {
            const cookie= Cookies.get()

        if(!cookie.token){
            setIsAuthenticate(false)
            setLoading(false)
            return setUser(null)
             
        }

        try {
        const res= await verifyTokenRequest(cookie.token)
        console.log(res)
        if(!res.data) {

            setIsAuthenticate(false)
            setLoading(false)
            
            return
        } 
        setIsAuthenticate(true)
        setUser(res.data)
        setLoading(false)

            
        } catch (error) {
            setIsAuthenticate(false)
            setUser(null)
            setLoading(false)

        }
        }
        checkLogin()
    }, [])

    return <authContext.Provider  
    value={{
        signup,
        signin,
        user,
        loading,
        isAuthenticate,
        errors,
        logout
    }}>
         {children} 
    </authContext.Provider>
}