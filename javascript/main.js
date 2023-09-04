import "../sass/style.scss";
import ToggleTheme from "./ToggleTheme";
import DragDrop from "./DragDrop";
import TodoList from "./TodoList";
import App from "./App";

const toggleTheme = new ToggleTheme("theme-toggle-button");
toggleTheme.toggleTheme();
const todoList = new TodoList();
const dragDrop = new DragDrop(todoList);
const app = new App(todoList, {
  formId: "task-input",
  listId: "task-list",
  filterGroupId: "filter-group",
  clearButtonId: "clear-completed",
  counterId: "left-items",
});

