import { useAuth } from "./context/authContex"
//llamamos a navigate para poder redirecionar al usuario en caso de estar o no autentificado
//oulet es como no queremos mostrar un div si esta autenthificado solo queremos que vaya a la ruta se usa para eso para que contunue hacia donde iba
import { Navigate, Outlet } from "react-router-dom";

//todo lo que esta adentro de provider en app.jsx tiene acceso a las funciones de contexto por eso usamos useAuth
function ProtectedRoute() {
    // verificamos si esta autentificado para ver que se hace y usamos estos metodos por que en app estan dentro de provider
    const {loading , isAuthenticate } = useAuth()
    if (loading) return <h1>Loading...</h1>
    if(!loading &&  !isAuthenticate ) return <Navigate to='/login' replace />
  
    return <Outlet/>
}
//En general aca solo validamos que haya iniciado sesion para mostrar y esto se aplica a todos las rutas en app.jsx Que englobe ProtedROUTER
export default ProtectedRoute