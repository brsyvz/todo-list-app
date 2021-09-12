import { projectId, projectlistArr } from "./project";
import { dom } from "./task_Dom";

function clear(e) {
  e.innerHTML = "";
}

function updateTaskHeader() {
  if (projectId !== "null") {
    const getProjectTitle = projectlistArr.find((el) => el.id === projectId);
    dom.taskHeader.textContent = getProjectTitle.name;
  } else {
    dom.taskHeader.textContent = "No project selected";
  }
}

function updateTaskCounter() {
  dom.taskCheckedSection.style.display = "";
  dom.taskClearRemaining.style.display = "";
  const selectedProject = projectlistArr.find((el) => el.id === projectId);
  const remainingTasks = [];
  const checkedTasks = [];
  if (projectId !== "null") {
    selectedProject.tasks.forEach((el) => {
      if (el.checked === false) {
        remainingTasks.push(el);
      } else if (el.checked === true) {
        checkedTasks.push(el);
      }
    });
    dom.taskCounter.textContent = `${remainingTasks.length} `;
    dom.taskCheckedCounter.textContent = checkedTasks.length;
    if (checkedTasks.length == 0) {
      dom.taskCheckedSection.style.display = "none";
    }
    if (remainingTasks.length == 0) {
      dom.taskCounter.textContent = "There is no task on this project.";
      dom.taskClearRemaining.style.display = "none";
    }
  } else if (projectId == "null") {
    dom.taskCounter.textContent = "";
  }
}

function manageCompletedArrow() {
  dom.taskClearCheckedBtn.style.display = "none";
  dom.taskCheckedList.style.display = "none";
  const rightArrow = document.getElementById("rightArrow");
  let isClicked = false;

  dom.taskArrowBtn.addEventListener("click", () => {
    if (isClicked === false) {
      isClicked = true;
      rightArrow.style.transform = "rotate(90deg)";
      dom.taskCheckedList.style.display = "";
      dom.taskClearCheckedBtn.style.display = "";
    } else if (isClicked === true) {
      isClicked = false;
      rightArrow.style.transform = "rotate(360deg)";
      dom.taskCheckedList.style.display = "none";
      dom.taskClearCheckedBtn.style.display = "none";
    }
  });
}

export { clear, updateTaskCounter, updateTaskHeader, manageCompletedArrow };
