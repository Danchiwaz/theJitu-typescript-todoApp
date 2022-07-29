import { InComplete } from "./InComplete.js";
const form = document.querySelector("#form-capture-data");
const allTasksBtn = document.querySelector("#all__tasks");
const incompleteBtn = document.querySelector("#incomplete");
const completeBtn = document.querySelector("#complete");
class Complete extends InComplete {
    constructor() {
        super();
    }
}
const handleChange = (id) => {
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
    var _a;
    create.renderTasks("all");
    (_a = document.querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
    allTasksBtn.classList.add("btn-active");
});
completeBtn.addEventListener("click", () => {
    var _a;
    create.renderTasks("complete");
    (_a = document.querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
    completeBtn.classList.add("btn-active");
});
incompleteBtn.addEventListener("click", () => {
    var _a;
    create.renderTasks("incomplete");
    (_a = document.querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
    incompleteBtn.classList.add("btn-active");
});
window.onload = () => {
    var _a;
    create.renderTasks("all");
    (_a = document.querySelector("button.btn-active")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-active");
    allTasksBtn.classList.add("btn-active");
};
// }
