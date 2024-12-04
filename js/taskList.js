import {Task} from "./task.js";

export class TaskList {
    #taskCollection;

    constructor() {
        this.#taskCollection = JSON.parse(localStorage.getItem('tasks'))?.map(
            taskData => new Task(
                taskData.id, 
                taskData.title, 
                taskData.description, 
                taskData.createdAt, 
                taskData.isCompleted
            )
        ) || [];
    }

    add(task) {
        this.#taskCollection.push(task);
        alert('Task added');
        this.saveToStorage();
    }

    remove(taskId) {
        this.#taskCollection = this.#taskCollection.filter(task => task.id !== taskId);
        alert('Task removed');
        this.saveToStorage();
    }

    update(taskToUpdate) {
        const taskIndex = this.#taskCollection.findIndex(task => task.id === taskToUpdate.id);
        if (taskIndex !== -1) {
            this.#taskCollection[taskIndex] = taskToUpdate;
            this.saveToStorage();
        }
    }

    findById(taskId) {
        return this.#taskCollection.find(task => task.id === taskId);
    }

    sort(criteria) {
        return [...this.#taskCollection].sort((taskA, taskB) => {
            if (criteria === 'name') {
                return taskA.title.localeCompare(taskB.title);
            } else if (criteria === 'date') {
                return new Date(taskB.createdAt) - new Date(taskA.createdAt);
            }
        });
    }

    saveToStorage() {
        const serializedTasks = this.#taskCollection.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
            isCompleted: task.isCompleted,
        }));
        localStorage.setItem('tasks', JSON.stringify(serializedTasks));
    }
}
