class Task {
  constructor(title = "", completed = false) {
    this.id = Math.floor(Math.random() * 100000);
    this.title = title;
    this.completed = completed;
  }
}

class TodoList {
  constructor() {
    this._tasks = JSON.parse(localStorage.getItem("tasks-list-db")) || [];
    this._filter = "all";
  }
  get tasks() {
    switch (this._filter) {
      case "completed":
        return this._tasks.filter((task) => task.completed === true);
      case "incompleted":
        return this._tasks.filter((task) => task.completed === false);
      default:
        return this._tasks;
    }
  }
  get filter() {
    return this._filter;
  }
  setFilter(filter) {
    if (
      typeof filter === "string" &&
      (filter === "completed" || filter === "incompleted" || filter === "all")
    ) {
      this._filter = filter;
    } else {
      throw new Error("Invalid filter value.");
    }
  }
  get leftItems() {
    return this._tasks.reduce(
      (count, task) => count + (!task.completed ? 1 : 0),
      0
    );
  }
  _updateLocalStorage() {
    localStorage.setItem("tasks-list-db", JSON.stringify(this._tasks));
  }
  addTask(taskTitle) {
    if (!taskTitle.trim()) {
      throw new Error("Task title cannot be empty.");
    }

    const task = new Task(taskTitle);
    this._tasks.push(task);
    this._updateLocalStorage();
  }
  checkTask(taskId) {
    const index = this._tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      this._tasks[index].completed = !this._tasks[index].completed;
      this._updateLocalStorage();
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  }

  deleteTask(taskId) {
    const index = this._tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      this._tasks.splice(index, 1);
      this._updateLocalStorage();
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  }
  clearCompleted() {
    this._tasks = this._tasks.filter((task) => !task.completed);
    this._updateLocalStorage();
  }
  updateAllTasks(tasks) {
    this._tasks = tasks;
    this._updateLocalStorage();
  }
}
export default TodoList;
