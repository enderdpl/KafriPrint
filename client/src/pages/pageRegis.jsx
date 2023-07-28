//esto se hace para tener los valores que el usuario va tipendo en un estado
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContex";
import { useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";


function PageRigis() {
  
  const {register,
     handleSubmit,
     formState: {errors}
    }= useForm()
  const { signup , isAuthenticate , errors: RegisterErrors }= useAuth()
    const navigate= useNavigate()
  useEffect(()=>{
    if(isAuthenticate) navigate('/tasks')
  }, [isAuthenticate])
  
  const onSubmit= handleSubmit(async (values)=>{
    signup(values);
  })
  return (
    <div className="flex h-[calc(100vh-140px)] items-center justify-center ">
    <div className="w-full bg-zinc-800 max-w-md rounded-md">
        {
            RegisterErrors.map((error,i)=>(
                <div className=" bg-red-500 p-2 text-white  " key={i}>
                    {error}

                </div>
            ))

        }
            

        <form onSubmit={onSubmit}>

          <h1 className=" text-3xl font-bold my-2">Registrarse</h1>

          <input type="text" {...register("username",{required:true})}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username"
          /> 

{/* Suponiendo que errors es un objeto con las propiedades de los errores */}
            {errors.username ? (
            <p className="text-red-500">Username es requerido</p>
            ) : null}




          <input type="email" {...register("email",{required:true})}
          className="w-full  bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"
          />

            {errors.email ? (
            <p className="text-red-500"> email es requerido</p>
            ) : null}


          <input type="password" {...register("password",{required:true})}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"
          />
          {errors.password ? (
            <p className="text-red-500"> password es requerido</p>
            ) : null}

          <button type="submit"
          className=" bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md my-2">Registrarse</button>

        </form>
        <p className=" flex gap-x-2 justify-between">
                ¿Ya tienes una cuenta? <Link to="/login" className=" text-sky-500">Inicio Sesion</Link> 
                </p>
    </div>
    </div>


  );
}
export default PageRigis