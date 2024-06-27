import { Task } from "./Task.js"

import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persiste()
    })
  }
  #persiste() {
    fs.writeFile(databasePath.pathname, JSON.stringify(this.#database), 'utf8')
  }

  create(table, data) {
    const { title, description } = data
    const task = new Task(title, description)

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persiste()
  }

  select(table) {
    let data = this.#database[table] ?? []

    return data
  }

  delete(table, id) {
    const index = this.#database[table].findIndex(task => task._id === id)

    if (index) {
      this.#database[table].splice(index, 1)
      this.#persiste()
    } else {
      return "Tasks não foi encontrada."
    }
  }

  update(table, id, data) {
    const taskIndex = this.#database[table].findIndex(task => task._id === id);

    if (taskIndex === -1) {
      return "Task não foi encontrada.";
    }

    const taskOld = this.#database[table][taskIndex];

    const newTask = new Task();
    newTask.title = data.title;
    newTask.description = data.description;
    newTask.completed_at = taskOld._completed_at;
    newTask.created_at = taskOld._created_at;
    newTask.id = taskOld._id;
    newTask.updateTask();

    this.#database[table][taskIndex] = newTask;
    this.#persiste();
  }
  completedTask(table, id) {
    const taskIndex = this.#database[table].findIndex(task => task._id === id);

    if (taskIndex === -1) {
      return "Task não foi encontrada.";
    }

    const taskOld = this.#database[table][taskIndex];

    const newTask = new Task();
    newTask.title = taskOld._title;
    newTask.description = taskOld._description;
    newTask.created_at = taskOld._created_at;
    newTask.id = taskOld._id;
    newTask.completedTeak();
    newTask.updateTask();


    this.#database[table][taskIndex] = newTask;
    this.#persiste();
  }

}