import { Link } from "react-router-dom";
import { useAuth } from "../context/authContex";



function Navbar() {

    const{isAuthenticate, logout, user}= useAuth()

  return (
    <nav className=" bg-custom-color my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to={
                  isAuthenticate ? "/tasks": "/"
                }>
        <h1 className=" text-2xl font-bold">Tasks Manager</h1>
        </Link>
        <ul className=" flex gap-x-2">
            {isAuthenticate ?(
              <> 
              <li>
                  Bienvenido {user.username}
                </li>
                 <li>
                <Link to="/add/task" className=" bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-sm">Agregar Tarea</Link>
                </li>
                <li>
                <Link to='/login' onClick={()=>{
                  logout()
                }} className=" bg-pink-800 hover:bg-pink-950  px-4 py-1 rounded-sm">Logout</Link>
                </li>
                </>
            ):(
              <>
                <li>
                  <Link to="/login" className=" bg-indigo-500  hover:bg-indigo-600 px-4 py-1 rounded-sm">Login</Link> 
                </li>
                 <li>
                <Link to="/register" className=" bg-indigo-500  hover:bg-indigo-600 px-4 py-1 rounded-sm">Register</Link>
                </li>
              </>
            ) }

        </ul>
    </nav>
  )
}

export default Navbar