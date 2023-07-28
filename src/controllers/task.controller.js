import Task from '../models/task.model.js'

export const getTasks= async (req,res)=>{
    const tasks= await Task.find({
        // para que me muestra solo tareas de este usuario logeado
        user: req.user.id
        //para que me muestre todos los datos del este usuario logeado con sus tareas
    }).populate('user')
    res.json(tasks)
}

export const createdTasks= async (req,res)=>{

    try {
        const {title,description,date}= req.body
    //este tiene el id del usuario ya que lo pasa con la funcion de autentificar el token
    console.log(req.user)
    const newTask= new Task ({
        title,
        description,
        date,
        user: req.user.id
    })
    const savedTask= await newTask.save()
    res.json(savedTask)
    } catch (error) {
        return res.status(500).json({message: "tarea no encontrada"})
        
    }

}

export const getTask= async (req,res)=>{

    try {
        const task= await Task.findById(req.params.id).populate('user')
    if(!task) return res.status(404).json({message: 'task not found'})
    res.json(task)
    } catch (error) {
        return res.status(500).json({message: "tarea no encontrada"})
    }

}

export const updatedTasks= async (req,res)=>{
    
    try {
        const task= await Task.findByIdAndUpdate(req.params.id, req.body,{new :true})
    if(!task) return res.status(404).json({message: 'task not found'})
    res.json(task)
    } catch (error) {
        return res.status(500).json({message: "Algo esta Mal"})
        
    }

}


export const deleteTasks= async (req,res)=>{
    try {
        const task= await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: 'task not found'})
    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: "Algo esta Mal"})
        
    }
}