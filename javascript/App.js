class App {
  constructor(
    todolist,
    { formId, listId, filterGroupId, clearButtonId, counterId }
  ) {
    this.todolist = todolist;
    this.inputForm = document.getElementById(formId);
    this.list = document.getElementById(listId);
    this.filterGroup = document.getElementById(filterGroupId);
    this.clearButton = document.getElementById(clearButtonId);
    this.counter = document.getElementById(counterId);
    //
    this.setHandlers();
    this.updateUi();
  }
  setHandlers() {
    this.formHandler();
    this.clearCompletedHandler();
    this.filterGroupHandler();
  }
  updateUi() {
    this.renderTasks();
    this.renderLeftItems();
  }
  // render
  renderTasks() {
    this.list.innerHTML = "";
    const fr = document.createDocumentFragment();
    if (this.todolist.tasks.length) {
      this.todolist.tasks.map((task) => {
        const li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.key = task.id;
        li.setAttribute("data-task-order", task.id);
        li.setAttribute("draggable", "true");
        li.setAttribute("class", task.completed ? "checked" : "");
        //check
        const check = document.createElement("button");
        check.classList.add("check");
        check.addEventListener("click", () => {
          this.todolist.checkTask(task.id);
          this.updateUi();
        });
        li.appendChild(check);
        //span
        const span = document.createElement("span");
        span.innerText = task.title;
        li.appendChild(span);
        //cross
        const cross = document.createElement("button");
        cross.classList.add("cross");
        cross.addEventListener("click", () => {
          this.todolist.deleteTask(task.id);
          this.updateUi();
        });
        li.appendChild(cross);
        //fr
        fr.appendChild(li);
      });
      this.list.appendChild(fr);
    } else {
      const li = document.createElement("li");
      li.classList.add("empty");
      li.innerText = "No tasks to show";
      fr.appendChild(li);
    }
    this.list.appendChild(fr);
  }
  renderLeftItems() {
    this.counter.innerText = `Left tasks: ${this.todolist.leftItems}`;
  }
  //handlers
  formHandler() {
    this.inputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.todolist.addTask(this.inputForm.title.value);
      this.inputForm.title.value = "";
      this.updateUi();
    });
  }
  clearCompletedHandler() {
    this.clearButton.addEventListener("click", () => {
      this.todolist.clearCompleted();
      this.updateUi();
    });
  }
  filterGroupHandler() {
    this.filterGroup.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        for (const el of this.filterGroup.children) {
          el.classList.remove("active");
        }
        this.todolist.setFilter(e.target.dataset.filter);
        e.target.classList.add("active");
      }
      this.updateUi();
    });
  }
}
export default App;
