const Store = require("../structures/Store");
const TaskManager = require("../structures/TaskManager");
const fs = require("fs-nextra");

class TaskStore extends Store {
  constructor(...args) {
    super(...args);
    this.manager = new TaskManager();
  }

  async runAll() {
    const tasks = await fs
      .readdir("./tasks")
      .then(t => t.map(task => this.resolve(task)))
      .catch(error => ({ error }));
    if (tasks.error) return Promise.reject(tasks.error);

    for (const task of tasks) {
      this.add(task.name.toLowerCase(), task);
      task._run();
    }

    return Promise.resolve(this);
  }

  resolve(name) {
    return new (require(`../tasks/${name}`))(this.client);
  }
}

module.exports = TaskStore;