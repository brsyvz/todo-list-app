/* eslint-disable require-jsdoc */
import { projectId, projectlistArr, updateLocalStorage } from "./project";
import { dom } from "./task_Dom";
import { clear, updateTaskCounter, updateTaskHeader } from "./ui";

dom.taskAddBtn.addEventListener("click", createTask);

class Task {
  constructor(id, name, checked) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }
}

function createTask(e) {
  e.preventDefault();
  const id = Date.now().toString();
  const taskName = dom.taskNameInput.value;
  const checked = false;
  if (taskName == null || taskName === "") {
    return;
  }
  const task = new Task(id, taskName, checked);
  dom.taskNameInput.value = null;
  const selectedProject = projectlistArr.find((el) => el.id === projectId);
  if (projectId !== "null") {
    selectedProject.tasks.push(task);
    renderTasks(selectedProject);
    updateLocalStorage();
  }
}

function renderTasks(el) {
  if (projectId !== "null") {
    dom.taskContainer.style.display = "";
    el = projectlistArr.find((el) => el.id === projectId);
    updateTaskCounter();
    clear(dom.taskList);
    clear(dom.taskCheckedList);
    el.tasks.forEach((task) => {
      const removeBtn = document.createElement("i");
      removeBtn.classList.add("far", "fa-trash-alt", "taskRemoveBtn");
      const div = document.createElement("div");
      const inputCheckbox = document.createElement("input");
      const label = document.createElement("label");
      div.className = "task";
      inputCheckbox.type = "checkbox";
      div.append(inputCheckbox, label, removeBtn);
      const taskDiv = div;
      const checkbox = taskDiv.querySelector("input");
      checkbox.id = task.id;
      checkbox.checked = task.checked;
      const getLabel = taskDiv.querySelector("label");
      //   getLabel.htmlFor = task.id;
      getLabel.textContent = task.name;
      dom.taskList.appendChild(taskDiv);
      if (task.checked === true) {
        dom.taskCheckedList.appendChild(taskDiv);
      }
    });
  } else if (projectId == "null") {
    dom.taskContainer.style.display = "none";
    updateTaskHeader();
  }
}

export { renderTasks };
