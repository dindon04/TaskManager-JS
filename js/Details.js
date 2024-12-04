import {TaskList} from "./taskList.js";

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (!taskId) window.location.href = '../pages/error404.html';


const taskList = new TaskList();
const task = taskList.getTaskById(taskId);


if (!task) window.location.href = '../pages/error404.html';


const taskDetails = document.getElementById('task-details');

if (taskDetails)
  {
  taskDetails.innerHTML = `
    <p><strong>Name:</strong> ${task.title}</p>
    <p><strong>Description:</strong> ${task.description}</p>
    <p><strong>Time:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
    <p><strong>Status:</strong> ${task.isCompleted ? 'Done' : 'Remaining'}</p>
  `;
} else console.error('Element #task-details not found in DOM');