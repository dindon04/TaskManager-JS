import {TaskList} from "./taskList.js";
import {Task} from "./task.js";

const taskManager = new TaskList();
const taskContainer = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const filterDropdown = document.getElementById('filter');
const sortDropdown = document.getElementById('sort');

function renderTasks() {
  const filterCriteria = filterDropdown.value;
  const sortCriteria = sortDropdown.value;

  const tasks = taskManager
      .sort(sortCriteria)
      .filter(
          task =>
              filterCriteria === 'all' ||
              (filterCriteria === 'done' && task.isCompleted) ||
              (filterCriteria === 'remaining' && !task.isCompleted)
      );

  taskContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    if (task.isCompleted) taskElement.classList.add('done');

    taskElement.innerHTML = `
      <div>
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''} data-id="${task.id}">
        <span class="task-title" data-id="${task.id}">${task.title} </span>
      </div>
      
      <div>
        <button data-id="${task.id}" class="edit-btn">Edit</button>
        <button data-id="${task.id}" class="delete-btn">Delete</button>
      </div>
    `;

    taskContainer.appendChild(taskElement);
  });

  document.querySelectorAll('.task-title').forEach(titleElement => {
    titleElement.addEventListener('click', e => {
      const taskId = e.target.dataset.id;
      window.location.href = `ViewTaskDetails.html?id=${taskId}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!addTaskForm) {
    console.error('Add Task Form not found in DOM');
    return;
  }
  addTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = addTaskForm.title.value.trim();
    const description = addTaskForm.description.value.trim();

    const titleRegex = /^(?!\d+$)[a-zA-Zа-яА-ЯёЁ0-9\s]{1,16}( [a-zA-Zа-яА-ЯёЁ0-9\s]{1,16})+$/;
    const descriptionRegex = /^.+$/;

    if (!titleRegex.test(title) || !descriptionRegex.test(description) || title === description) {
      alert('Invalid input. Please check the fields.');
      return;
    }

    const newTask = new Task(
        Date.now().toString(),
        title,
        description,
        new Date().toISOString()
    );

    taskManager.add(newTask);
    addTaskForm.reset();
    renderTasks();
  });
});

taskContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    taskManager.remove(id);
    renderTasks();
  }
});

taskContainer.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.dataset.id;
    window.location.href = `EditTaskPage.html?id=${id}`;
  }
});

taskContainer.addEventListener('change', e => {
  if (e.target.type === 'checkbox') {
    const id = e.target.dataset.id;
    const task = taskManager.findById(id);
    if (task) {
      task.isCompleted = e.target.checked;
      taskManager.update(task);
      renderTasks();
    }
  }
});

filterDropdown.addEventListener('change', renderTasks);
sortDropdown.addEventListener('change', renderTasks);

renderTasks();
