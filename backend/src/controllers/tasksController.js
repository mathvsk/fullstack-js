import {getAll, createTask, deleteTask, updateTask} from '../models/tasksModel.js';

class TasksController {
  async getAll(_, res) {
    const tasks = await getAll();
    
    res.status(200).json({
      tasks
    });
  }

  async createTask(req, res) {
    const createdTask = await createTask(req.body); 

    return res.status(201).json({
      createdTask
    });
  } 

  async deleteTask(req, res) {
    const {id} = req.params;
    await deleteTask(id);

    return res.status(200).json({
      message: 'task removida'
    });
  }

  async updateTask(req, res) {
    const {id} = req.params;
    const task = req.body;

    await updateTask(id, task);

    return res.status(200).json({
      message: 'task atualizada'
    });
  }

}

export { TasksController };