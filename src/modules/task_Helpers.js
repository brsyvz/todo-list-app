import { projectId, projectlistArr, updateLocalStorage } from "./project";
import { renderTasks } from "./task";
import { dom } from "./task_Dom";

import soundfile from "../sound/smb_coin.mp3";
const checkedSound = new Audio(soundfile);

dom.taskClearRemaining.addEventListener("click", clearRemainingTasks);
dom.taskClearCheckedBtn.addEventListener("click", clearCompletedTasks);

function removeTask() {
  dom.taskContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "i") {
      const selectedProject = projectlistArr.find((el) => el.id === projectId);
      const selectedTaskId = e.target.parentNode.firstElementChild.id;
      const filteredTaskArr = selectedProject.tasks.filter(
        (task) => task.id !== selectedTaskId
      );
      selectedProject.tasks = filteredTaskArr;
      updateLocalStorage();
      renderTasks();
    }
  });
}
function moveCheckedTasks() {
  dom.taskList.addEventListener("click", (e) => {
    const selectedProject = projectlistArr.find((el) => el.id === projectId);
    if (e.target.tagName.toLowerCase() === "input") {
      selectedProject.tasks.find((task) => {
        if (e.target.id === task.id && task.checked == false) {
          task.checked = true;
          dom.taskCheckedList.appendChild(e.target.parentNode);
          checkedSound.volume = 0.2;
          checkedSound.currentTime = 0;
          checkedSound.play();
        } else if (e.target.id === task.id && task.checked == true) {
          task.checked = false;
        }
      });

      updateLocalStorage();
    }
  });

  dom.taskCheckedList.addEventListener("click", (e) => {
    const selectedProject = projectlistArr.find((el) => el.id === projectId);
    if (e.target.tagName.toLowerCase() === "input") {
      selectedProject.tasks.find((task) => {
        if (e.target.id === task.id && task.checked == true) {
          task.checked = false;
          dom.taskList.appendChild(e.target.parentNode);
        }
      });
      updateLocalStorage();
    }
  });
}
function clearRemainingTasks() {
  const selectedProject = projectlistArr.find((el) => el.id === projectId);
  const filteredTasks = selectedProject.tasks.filter(
    (el) => el.checked === true
  );
  selectedProject.tasks = filteredTasks;
  updateLocalStorage();
  renderTasks();
}

function clearCompletedTasks() {
  const selectedProject = projectlistArr.find((el) => el.id === projectId);
  const filteredTasks = selectedProject.tasks.filter(
    (el) => el.checked === false
  );
  selectedProject.tasks = filteredTasks;
  updateLocalStorage();
}

export {
  removeTask,
  moveCheckedTasks,
  clearRemainingTasks,
  clearCompletedTasks,
};
