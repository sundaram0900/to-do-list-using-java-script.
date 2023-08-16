let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

console.log("Working");
function fetchTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tasks = data.slice(0, 10);
      renderList();
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

function addTasktoDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `
  <li>
  <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } class="custom-checkbox">
  <label for="${task.id}">${task.title}</label>
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
    return task.id === Number(taskId);
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currenttask.completed = !currenttask.completed;
    renderList();
    showNotification("task is toggled successfully");
    return;
  }
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== Number(taskId);
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
      title: text,
      id: Date.now(),
      completed: false,
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

function initializeApp() {
  fetchTodos();
  addTaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener("click", handleClicklistner);
}

initializeApp();
