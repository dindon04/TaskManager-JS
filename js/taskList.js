import {Task} from "./task.js";

export class TaskList {
    #tasks;

    constructor() {
        this.#tasks = JSON.parse(localStorage.getItem('tasks'))?.map(
            task => new Task(task.id, task.title, task.description, task.createdAt, task.isCompleted)
        ) || [];
    }

    addTask(task) {
        this.#tasks.push(task);
        alert('task added');
        this.saveTasks();
    }

    deleteTask(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== id);
        alert('task deleted');
        this.saveTasks();
    }

    updateTask(updatedTask) {
        const index = this.#tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) 
        {
            this.#tasks[index] = updatedTask;
            this.saveTasks();
        }
    }
}