import {TaskList} from "./taskList.js";

const taskList = new TaskList();
const editTask = document.getElementById("edit-task-form");

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (!taskId) {
    window.location.href = '../HTML pages/error404.html';
}

const task = taskList.getTaskById(taskId);
if (!task) {
    alert('Task not found!');
    window.location.href = '../HTML pages/MainPage.html';
}

editTask.title.value = task.title;
editTask.description.value = task.description;

editTask.addEventListener("submit", e => {
    e.preventDefault();

    const updatedTitle = editTask.title.value.trim();
    const updatedDescription = editTask.description.value.trim();

    if (!updatedTitle || !updatedDescription) {
        alert('Fields cannot be empty.');
        return; 
    }

    task.title = updatedTitle;
    task.description = updatedDescription;
    task.updatedAt = new Date().toISOString();

    taskList.updateTask(task);

    alert("Fields are updated!");
    window.location.href = '../HTML pages/MainPage.html'; 
});
