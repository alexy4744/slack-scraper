/* A manager that handles all the tasks to prevent adding and then running duplicate tasks */

class TaskManager extends Map {
  constructor(...args) {
    super(...args);
  }

  add(key, fn, interval) {
    if (typeof key !== "string" || typeof fn !== "function" || typeof interval !== "number") {
      throw new Error(`'key' argument must be a string, 'fn' argument must be a function to execute and 'interval' must be a number!`);
    }

    if (this.has(key)) return this.get(key);

    this.set(key, setInterval(() => {
      fn();
      this.remove(key);
    }, interval));
    return this.get(key);
  }

  remove(key) {
    if (typeof key !== "string") throw new Error(`You can only remove items from TaskManager by specifying the key of the item`);
    if (!this.has(key)) return this;
    clearInterval(this.get(key));
    this.delete(key);
    return this;
  }
}

module.exports = TaskManager;