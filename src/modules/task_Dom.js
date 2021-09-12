const dom = {
  taskContainer: document.querySelector(".taskSection"),
  taskHeader: document.querySelector(".projectName"),
  taskCounter: document.querySelector(".taskCounter"),
  taskNameInput: document.querySelector(".taskForm_textInput"),
  taskAddBtn: document.querySelector(".taskForm_addBtn"),
  taskList: document.querySelector(".tasks"),
  taskClearRemaining: document.getElementById("clearRemaining"),
  taskCheckedSection: document.querySelector(".checkedSection"),
  taskCheckedList: document.querySelector(".checkedTaskList"),
  taskArrowBtn: document.getElementById("arrowBtn"),
  taskCheckedCounter: document.getElementById("checkedCount"),
  taskClearCheckedBtn: document.getElementById("clearChecked"),
};

export { dom };
export const { taskList } = dom;
