import {fetchTasks, addTask, deleteTask, updateTask } from './controller.js';
import { ElementsHTML } from './elements.js';
import { formatDate } from './utils.js';

const elementsHTML = new ElementsHTML();

function createElement(tag, opcoes) {
  const element = document.createElement(tag);

  if (opcoes.className !== undefined) {
    element.className = opcoes.className
  }
  
  if (opcoes.title !== undefined) {
    element.innerText = opcoes.title
  }

  if (opcoes.created_at !== undefined) {
    element.innerText = opcoes.created_at
  }

  if (opcoes.innerHtml !== undefined) {
    element.innerHTML = opcoes.innerHtml
  }

  return element;
}

function createSelect(value) {
  const select = createElement('select', {
    className: 'w-full p-2 rounded-lg font-semibold capitalize bg-zinc-200 hover:bg-zinc-200 ease-in duration-300',
    innerHtml: `
      <option value="pendente">pendente</option>
      <option value="em andamento">em andamento</option>
      <option value="concluída">concluída</option>
  `
  });
  
  select.value = value;

  return select;
}

function createTask(task) {
  let { id, title, created_at, status } = task;

  const tr = createElement('tr', {
    className: 'even:bg-gray-100'
  });

  const tdTitle = createElement('td', {
    className: 'p-4 border text-center',
    title
  });

  const tdCreatedAt = createElement('td', {
    className: 'p-4 border text-center',
    created_at: formatDate(created_at)
  })

  const tdStatus = createElement('td', {
    className: 'p-4 border text-center',
  })
  const tdActions = createElement('td', {
    className: 'p-4 border text-center',
  })

  const editButton = createElement('button', {
    className: 'rounded p-1 mr-1 text-white inline-flex items-center justify-center cursor-pointer bg-blue-300',
    innerHtml: '<span class="material-symbols-outlined">edit</span>'
  })

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';

    const editForm = createElement('form', {})
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const title = editInput.value;
      
      await updateTask({ ...task, title });
      
      loadTasks();
    });

    const editInput = createElement('input', {
      className: 'w-full p-4 border border-solid rounded-md outline-none text-base font-bold input-task input-task-edit',
    })

    editInput.value = title;
    
    editForm.appendChild(editInput)
    
    tdTitle.appendChild(editForm);
    
    document.querySelector('.input-task-edit').focus();
  })
  
  const deleteButton = createElement('button', {
    className: 'rounded p-1 text-white inline-flex items-center justify-center cursor-pointer bg-red-500',
    innerHtml: '<span class="material-symbols-outlined">delete</span>'
  })

  deleteButton.addEventListener('click', async () => {
    await deleteTask(id);
    loadTasks();
  })


  const select = createSelect(status);
  select.addEventListener('change', async (event) => {

    title = document.querySelector('.input-task-edit').value ? document.querySelector('.input-task-edit').value : title;

    const status = event.target.value;
    await updateTask({ ...task, status, title:document.querySelector('.input-task-edit').value });
    
    loadTasks();
  });

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  
  return tr;
}

async function loadTasks() {
  const tasks  = await fetchTasks();

  elementsHTML.tbody.innerHTML = '';

  tasks.map((task) => {
    const tr = createTask(task);
    elementsHTML.appendChild(tr);
  });
}

elementsHTML.addForm.addEventListener('submit', async (event) => {
  await addTask(event);
  loadTasks();

  document.querySelector('.input-task').value = '';
});

loadTasks();