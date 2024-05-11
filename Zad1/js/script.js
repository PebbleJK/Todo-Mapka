let taskArray = [];
const taskContainer = document.querySelector(".task-container");
const addTaskButton = document.querySelector("button");
const taskInput = document.querySelector("input");

const generateTasks = () => {
  taskContainer.innerHTML = "";
  for(let i = 0; i < taskArray.length; i++){
    if(!taskArray[i].done){
        taskContainer.innerHTML += `
        <div class="task" onclick="checkTask(this)">
          <span>${taskArray[i].task}</span>
          <i class="fa-solid fa-x" onclick="deleteTask(this)"></i>
        </div>
      `;
    }
    else {
      taskContainer.innerHTML += `
        <div class="task done" onclick="checkTask(this)">
          <span>${taskArray[i].task}</span>
          <i class="fa-solid fa-x" onclick="deleteTask(this)"></i>
        </div>
      `;
    }
  }
};

const addTask = () => {
  const inputValue = taskInput.value;
  if(inputValue !== ""){
    const task = {
      task: inputValue,
      done: false
    }
    taskArray.push(task);
    console.log(taskArray);
    generateTasks();
  }
};

const checkTask = (task) => {
  task.classList.toggle("done");
  const element = task.children[0].innerText;
  for (let i = 0; i < taskArray.length; i++){
    if(taskArray[i].task === element){
      taskArray[i].done = !taskArray[i].done;
    }
  }
};

const deleteTask = (task) => {
  const element = task.parentElement.children[0].innerText;
  task.parentElement.remove();
  for (let i = 0; i < taskArray.length; i++){
    if(taskArray[i].task === element){
      taskArray.splice(i,i);
      break;
    }
  }
  console.log(taskArray);
}


addTaskButton.addEventListener("click", addTask);