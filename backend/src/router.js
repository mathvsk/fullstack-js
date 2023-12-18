import express from 'express';

import {TasksController} from './controllers/tasksController.js';
import { validadeFieldTitle, validadeFieldStatus } from './middlewares/tasksMiddleware.js';

const router = express.Router();
const tasksController = new TasksController();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', validadeFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', [ validadeFieldTitle, validadeFieldStatus ], tasksController.updateTask);

export { router };