import {connection} from './connection.js';

async function getAll() {
  const [tasks] = await connection.execute('SELECT * FROM tasks');

  return tasks;
}

async function createTask(task) {
  const { title } = task;

  const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';
  const dateUTC = new Date(Date.now()).toUTCString();

  const [cratedTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

  return {insertId: cratedTask.insertId};
} 

async function deleteTask(id) {
  const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);

  return removedTask;
}

async function updateTask(id, task) {
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const {title, status} = task;
  
  const updatedTask = await connection.execute(query, [title, status, id]);

  return updatedTask;
}

export { getAll, createTask, deleteTask, updateTask };