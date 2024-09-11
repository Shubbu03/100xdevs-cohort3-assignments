// Dummy local storage for storing users and tasks
let users = [];
let currentUser = null;

// HTML Elements
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const taskSection = document.getElementById("taskSection");
const authSection = document.getElementById("authSection");
const usernameDisplay = document.getElementById("usernameDisplay");

// Signup Elements
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");

// Signin Elements
const signinUsername = document.getElementById("signinUsername");
const signinPassword = document.getElementById("signinPassword");
const signinBtn = document.getElementById("signinBtn");

// Task Elements
const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");

// Show Signin/Signup toggle
document.getElementById("showSignin").addEventListener("click", () => {
  signupForm.classList.add("hidden");
  signinForm.classList.remove("hidden");
});

document.getElementById("showSignup").addEventListener("click", () => {
  signinForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

// Signup Functionality
signupBtn.addEventListener("click", () => {
  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();
  if (username && password) {
    const userExists = users.find((user) => user.username === username);
    if (!userExists) {
      users.push({ username, password, tasks: [] });
      alert("Signup successful! Please sign in.");
      signupUsername.value = "";
      signupPassword.value = "";
    } else {
      alert("User already exists.");
    }
  } else {
    alert("Please fill out both fields.");
  }
});

// Signin Functionality
signinBtn.addEventListener("click", () => {
  const username = signinUsername.value.trim();
  const password = signinPassword.value.trim();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    loadTaskManagement();
  } else {
    alert("Invalid username or password.");
  }
});

// Load Task Management Section
function loadTaskManagement() {
  signinForm.classList.add("hidden");
  authSection.classList.add("hidden");
  taskSection.classList.remove("hidden");
  usernameDisplay.textContent = currentUser.username;
  loadTasks();
}

// Add Task Functionality
addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    currentUser.tasks.push({ text: task, completed: false });
    taskInput.value = "";
    loadTasks();
  }
});

// Load Tasks to the DOM
function loadTasks() {
  taskList.innerHTML = "";
  currentUser.tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.classList.toggle("completed", task.completed);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => {
      currentUser.tasks[index].completed = !task.completed;
      loadTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      currentUser.tasks.splice(index, 1);
      loadTasks();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Logout Functionality
logoutBtn.addEventListener("click", () => {
  currentUser = null;
  taskSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  signinForm.classList.remove("hidden");
});
