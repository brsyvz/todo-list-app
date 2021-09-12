import {removeProject, renderDefaultProject, renderProjects} from './modules/project';
import {renderTasks} from './modules/task';
import './styles/global.css';
import { updateTaskCounter,manageCompletedArrow } from './modules/ui';
import { moveCheckedTasks, removeTask } from './modules/task_Helpers';

manageCompletedArrow();
renderProjects();
renderDefaultProject();
renderTasks();
removeProject();
removeTask();
moveCheckedTasks();
updateTaskCounter();


// manages displaying sidebar and hamburger menu icon's event.
(function() {
  const icon = document.querySelector('.icon');
  icon.addEventListener('click', toggleSidebar);

  const sidebar = document.querySelector('.projectSection');
  window.onresize = displayWindowSize;
  window.onload = displayWindowSize;

  function displayWindowSize() {
    const myWidth = window.innerWidth;
    if (myWidth > 720) {
      sidebar.style.display = '';
    }
  }
  function toggleSidebar() {
    if (sidebar.style.display === '') {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = '';
    }
  }
})();
