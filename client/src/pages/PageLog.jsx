import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";



function PageLog() {
    const {register,handleSubmit, formState : {errors} } = useForm()

    const {signin, errors:signinErrors, isAuthenticate }= useAuth()
    const navigate= useNavigate()

    const onSubmit= handleSubmit((data)=>{
        signin(data)
    })

    useEffect(() =>{
        if (isAuthenticate) {
        navigate('/tasks')
    }
    }, [isAuthenticate])


  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className=" bg-custom-color max-w-md w-full p-10 rounded-md">
        {  
            signinErrors.map((error,i)=>(
                <div className=" text-center  bg-red-500 p-2 text-white  " key={i}>
                    {error}

                </div>
            ))
            }
            
        <h1 className=" text-3xl font-bold my-2">Login</h1>
        <form onSubmit={onSubmit}>
            <input type="email" {...register("email",{required:true})}
            className="w-full   bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"
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
            <button type="submit" className=" bg-sky-500  hover:bg-sky-600 text-white px-4 py-2 rounded-md my-2">Login</button>
            </form>
            <p className=" flex gap-x-2 justify-between">
                ¿No Tienes Cuenta? <Link to="/register" className=" text-sky-500" hover:bg-sky-600>Registrarse</Link> 
                </p>
        </div>
    </div>
  )
}

export default PageLog