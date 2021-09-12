import { taskList } from "./task_Dom";
import { renderTasks } from "./task";
import { clear, updateTaskCounter, updateTaskHeader } from "./ui";

//----- manage local storage ----
const LsProjectList = "task.projectlistArr";
const LsProjectId = "task.projectId";

let projectlistArr = JSON.parse(localStorage.getItem(LsProjectList)) || [];
let projectId = localStorage.getItem(LsProjectId);

function updateLocalStorage() {
  localStorage.setItem(LsProjectList, JSON.stringify(projectlistArr));
  localStorage.setItem(LsProjectId, projectId);
  renderProjects();
  renderTasks();
}
//----- manage local storage ----

const projectContainer = document.querySelector(".projectList");
const projectNameInput = document.querySelector(".projectNameInput");
const projectAddBtn = document.querySelector(".projectAddBtn");

projectAddBtn.addEventListener("click", createProject);
projectContainer.addEventListener("click", getProjectId);

class Project {
  constructor(id, name, tasks) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }
}

function getProjectId(el) {
  if (el.target.className === "project") {
    projectId = el.target.id;
  }
  updateLocalStorage();
}

function createProject(el) {
  el.preventDefault();
  const id = Date.now().toString();
  const tasks = [];
  const name = projectNameInput.value;
  projectNameInput.value = null;
  if (name === "") {
    return;
  }
  const project = new Project(id, name, tasks);
  projectlistArr.push(project);
  updateLocalStorage();
}

function renderProjects() {
  clear(projectContainer);
  projectlistArr.forEach((el) => {
    const removeBtn = document.createElement("i");
    removeBtn.classList.add("far", "fa-trash-alt", "projectRemoveBtn");
    const label = document.createElement("label");
    const remainingTasks = [];
    el.tasks.forEach((el) => {
      if (el.checked !== true) {
        remainingTasks.push(el);
      }
    });
    label.textContent = remainingTasks.length;
    const listItem = document.createElement("li");
    listItem.id = el.id;
    listItem.classList.add("project");
    listItem.textContent = el.name;
    listItem.appendChild(label);
    if (listItem.id === projectId) {
      listItem.classList.add("activeElement");
      if (projectId !== "123") {
        listItem.appendChild(removeBtn);
        updateTaskHeader();
      }
    }
    projectContainer.appendChild(listItem);
    updateTaskHeader();
  });
}

function removeProject() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "i") {
      if (confirm("Delete project?")) {
        projectlistArr = projectlistArr.filter((item) => item.id !== projectId);
        projectId = "null";
        updateTaskHeader();
        clear(taskList);
        updateTaskCounter();
        updateLocalStorage();
      }
    }
  });
}

function renderDefaultProject() {
  if (projectlistArr.length == 0) {
    const defaultProject = new Project("123", "default", [
      {
        id: "444",
        name: "create a new project.",
        checked: false,
      },
    ]);
    projectlistArr.push(defaultProject);
    projectId = projectlistArr[0].id;
    updateLocalStorage();
  }
  updateTaskHeader();
}

export {
  projectId,
  projectlistArr,
  updateLocalStorage,
  renderProjects,
  removeProject,
  renderDefaultProject,
};
