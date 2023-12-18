export async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  const data = await response.json();
  
  return data.tasks;
}

export async function addTask(event) {
  event.preventDefault();

  const inputTask = document.querySelector('.input-task');

  const task = {
    title: inputTask.value
  };
  
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
}

export async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  });
}

export async function updateTask(task) {
  const { id, title, created_at, status } = task;

  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      status
    })
  });
}