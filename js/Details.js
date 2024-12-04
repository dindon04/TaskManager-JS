import {TaskList} from "./taskList.js";

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (!taskId) 
    {
  console.log('No task ID provided, redirecting to error page');
  window.location.href = '../pages/error404.html';
}

const taskList = new TaskList();
const task = taskList.getTaskById(taskId);

if (!task) {
  console.log('Task not found, redirecting to error page');
  window.location.href = '../HTML pages/error404.html';
}

const taskDetails = document.getElementById('task-details');

if (taskDetails) {
  console.log('Rendering task details:', task);
  taskDetails.innerHTML = `
    <p><strong>Name:</strong> ${task.title}</p>
    <p><strong>Description:</strong> ${task.description}</p>
    <p><strong>Time:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
    <p><strong>Status:</strong> ${task.isCompleted ? 'Done' : 'Remaining'}</p>
  `;
} else {
  console.error('ERROR');
}
