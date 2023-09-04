class DragDrop {
  constructor(todoList) {
    this.todoList = todoList;
    this.taskList = document.getElementById("task-list");
    this.draggingElement = null;

    this.taskList.addEventListener(
      "dragstart",
      this.handleDragStart.bind(this)
    );
    this.taskList.addEventListener("dragover", this.handleDragOver.bind(this));
    this.taskList.addEventListener("dragend", this.handleDragEnd.bind(this));
    this.taskList.addEventListener("drop", this.handleDrop.bind(this));
  }

  handleDragStart(e) {
    this.draggingElement = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("dragging");
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragEnd() {
    if (this.draggingElement) {
      this.draggingElement.classList.remove("dragging");
      this.draggingElement = null;
      this.logTasksArray();
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const targetTask = e.target.closest("li");
    if (this.draggingElement && targetTask) {
      const draggingOrder =
        this.draggingElement.getAttribute("data-task-order");
      const targetOrder = targetTask.getAttribute("data-task-order");

      if (draggingOrder && targetOrder) {
        this.taskList.insertBefore(this.draggingElement, targetTask);

        this.draggingElement.setAttribute("data-task-order", targetOrder);
        targetTask.setAttribute("data-task-order", draggingOrder);
      }
    }
  }

  logTasksArray() {
    const tasks = Array.from(this.taskList.querySelectorAll("li")).map(
      (task) => {
        return {
          id: task.getAttribute("id"),
          title: task.querySelector('span').innerText,
          completed: task.classList.contains("checked"),
        };
      }
    );
    console.log(tasks)
    this.todoList.updateAllTasks(tasks);
  }
}

export default DragDrop;
