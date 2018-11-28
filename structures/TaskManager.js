/* A manager that handles all the tasks to prevent adding and then running duplicate tasks */

class TaskManager extends Map {
  constructor(...args) {
    super(...args);
  }

  add(key, fn, interval) {
    if (this.has(key)) return this.get(key);
    this.set(key, setInterval(() => {
      fn();
      this.remove(key);
    }, interval));
    return this.get(key);
  }

  remove(key) {
    if (!this.has(key)) return this;
    clearInterval(this.get(key));
    this.delete(key);
    return this;
  }
}

module.exports = TaskManager;