let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

console.log("Working");

function addTasktoDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `
  <li>
  <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
  <label for="${task.id}">${task.text}</label>
  <img src="https://icon-library.com/images/delete-button-icon/delete-button-icon-29.jpg" class="delete" data-id="${
    task.id
  }"  / length="10px"
  width ="10px">
 </li> 
  
  `;
  taskList.append(li);
}

function renderList() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTasktoDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification("task is toggled successfully");
    return;
  }
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("task deleted succesfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }
  showNotification("task cant be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeypress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    console.log("text", text);

    if (!text) {
      showNotification("this can not be empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
function handleClicklistner(e) {
  const target = e.target;
  console.log(target);

  if (target.className === "delete") {
    const taskId = target.dataset.id;
    console.log(taskId);
    deleteTask(taskId);
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

addTaskInput.addEventListener("keyup", handleInputKeypress);
document.addEventListener("click", handleClicklistner);
