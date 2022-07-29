import { TaskInterface } from "./interfaces/TaskInterface.js";
import { render } from "./render.js";
import { InComplete } from "./InComplete.js";

const form = document.querySelector("#form-capture-data") as HTMLFormElement;
const allTasksBtn = document.querySelector("#all__tasks") as HTMLButtonElement;
const incompleteBtn = document.querySelector(
  "#incomplete"
) as HTMLButtonElement;
const completeBtn = document.querySelector("#complete") as HTMLButtonElement;

class Complete extends InComplete {
  constructor() {
    super();
  }
}

const handleChange = (id: string) => {
  console.log(id);
};

// window.onload = () => {
const create = new Complete();
// console.log(create.getTotalData());

form.addEventListener("submit", (event) => {
  event.preventDefault();
  create.accceptData();
});

allTasksBtn.addEventListener("click", () => {
  create.renderTasks("all");
  document.querySelector("button.btn-active")?.classList.remove("btn-active");
  allTasksBtn.classList.add("btn-active");
});
completeBtn.addEventListener("click", () => {
  create.renderTasks("complete");
  document.querySelector("button.btn-active")?.classList.remove("btn-active");
  completeBtn.classList.add("btn-active");
});
incompleteBtn.addEventListener("click", () => {
  create.renderTasks("incomplete");
  document.querySelector("button.btn-active")?.classList.remove("btn-active");
  incompleteBtn.classList.add("btn-active");
});

window.onload = () => {
  create.renderTasks("all");
  document.querySelector("button.btn-active")?.classList.remove("btn-active");
  allTasksBtn.classList.add("btn-active");
};

// }
