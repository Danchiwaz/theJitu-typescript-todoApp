import { render } from "./render.js";
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date_due = document.querySelector("#date");
const taskContainer = document.querySelector("#tasks");
const btnEditSubmit = document.querySelector(".btn-edit-submit");
const completeBtn = document.querySelector("#complete");
const incompleteBtn = document.querySelector("#incomplete");
export class InComplete {
    constructor() {
        this.tasks = [];
        this.getTotalData = () => {
            if (localStorage.getItem("tasks")) {
                const tasksList = localStorage.getItem("tasks");
                return tasksList ? JSON.parse(tasksList) : [];
            }
            else {
                return [];
            }
        };
        this.accceptData = () => {
            var _a;
            let task;
            if (title.value !== "" &&
                description.value !== "" &&
                date_due.value !== "" &&
                new Date(date_due.value).getDate() >= new Date().getDate()) {
                task = {
                    id: Math.ceil(Math.random() * 100),
                    title: title.value,
                    description: description.value,
                    createdat: new Date(),
                    due_at: date_due.value,
                    completed: false,
                };
                this.tasks.unshift(task);
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
                this.renderTasks("incomplete");
                this.clearForm();
                (_a = document
                    .querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
                incompleteBtn.classList.add("btn-active");
            }
            else {
                alert("Missing field or Date is Less than the current Date ");
            }
        };
        this.toggleTasks = (taskId) => {
            var _a;
            const todods = this.tasks;
            const found = todods.find((t) => t.id === taskId);
            if (found)
                Object.assign(found, { completed: !found.completed });
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.renderTasks("complete");
            (_a = document.querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
            completeBtn.classList.add("btn-active");
        };
        this.addListeners = () => {
            const deleteBtns = document.querySelectorAll("#btn-delete");
            const updateBtns = document.querySelectorAll("#btn-update");
            const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
            for (const deleteBtn of deleteBtns) {
                deleteBtn.addEventListener("click", (e) => {
                    if (e.target) {
                        const target = e.target;
                        const id = target.getAttribute("data-id");
                        if (id) {
                            this.deleteTodo(parseInt(id));
                        }
                    }
                });
            }
            for (const updateBtn of updateBtns) {
                updateBtn.addEventListener("click", (e) => {
                    if (e.target) {
                        const target = e.target;
                        const id = target.getAttribute("data-id");
                        if (id) {
                            this.populateForEdit(parseInt(id));
                        }
                    }
                });
            }
            for (const checkBox of checkBoxes) {
                checkBox.addEventListener("change", (e) => {
                    if (e.target) {
                        const target = e.target;
                        const id = target.getAttribute("data-id");
                        if (id)
                            this.toggleTasks(parseInt(id));
                    }
                });
            }
            btnEditSubmit.addEventListener("click", (e) => {
                if (e.target) {
                    const target = e.target;
                    const id = target.getAttribute("data-id");
                    this.updateTodo(parseInt(id));
                }
            });
        };
        this.populateForEdit = (id) => {
            const foundTodo = this.tasks.find((t) => t.id === id);
            if (foundTodo) {
                title.value = foundTodo.title;
                description.value = foundTodo.description;
                date_due.value = foundTodo.due_at;
                document.querySelector(".btn-add-submit").style.display = "none";
                btnEditSubmit.style.display = "inline";
                btnEditSubmit.setAttribute("data-id", foundTodo.id + "");
            }
        };
        this.deleteTodo = (id) => {
            var _a, _b;
            // window.confirm("Are you sure");
            const foundTodo = this.tasks.find((t) => t.id === id);
            if (foundTodo) {
                const index = this.tasks.indexOf(foundTodo);
                const activeBtn = document.querySelector("button.btn-active");
                const status = (_b = (_a = activeBtn.children[1].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.split(" ")[0];
                this.tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
                if (status)
                    this.renderTasks(status === "pending"
                        ? "incomplete"
                        : status === "completed"
                            ? "complete"
                            : "all");
            }
        };
        this.updateTodo = (id) => {
            const foundTodo = this.tasks.find((t) => t.id === id);
            console.log(foundTodo);
            if (foundTodo) {
                const index = this.tasks.indexOf(foundTodo);
                let task;
                if (title.value !== "" &&
                    description.value !== "" &&
                    date_due.value !== "") {
                    task = {
                        id: id,
                        title: title.value,
                        description: description.value,
                        createdat: foundTodo.createdat,
                        due_at: date_due.value,
                        completed: false,
                    };
                    Object.assign(foundTodo, task);
                    // this.tasks.splice(index, 1, task);
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    this.renderTasks("incomplete");
                    this.clearForm();
                }
            }
        };
        this.tasks = this.getTotalData();
    }
    clearForm() {
        title.value = "";
        description.value = "";
        date_due.value = "";
    }
    refreshPage() {
        window.location.reload();
    }
    renderTasks(status) {
        taskContainer.innerHTML = "";
        let tasklist;
        if (status === "complete") {
            tasklist = this.tasks.filter((task) => task.completed);
        }
        else if (status === "incomplete") {
            tasklist = this.tasks.filter((task) => !task.completed);
        }
        else {
            tasklist = this.tasks;
        }
        taskContainer.innerHTML = !render(tasklist)
            ? "<h3 data-aos='fade-left' data-aos-duration='3000' class='task-title'>No tasks available</h3>"
            : render(tasklist);
        this.addListeners();
    }
}
