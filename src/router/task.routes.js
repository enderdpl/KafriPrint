import {Router} from 'express'

import {authRequire} from '../middlewares/validateToken.js'

import {createdTasks,getTask,getTasks,updatedTasks,deleteTasks} from '../controllers/task.controller.js' 

import { validateSchema } from "../middlewares/validator.middleware.js";

import { createTaskSchema } from "../schemas/task.schuema.js";


const router= Router()

router.get('/tasks',authRequire, getTasks)

router.get('/task/:id',authRequire,getTask)

router.post('/tasks',authRequire,validateSchema(createTaskSchema) ,createdTasks)

router.put('/tasks/:id',authRequire,updatedTasks)

router.delete('/tasks/:id',authRequire,deleteTasks)

export default router