const API_URL = "http://localhost:3001/todos";

// Fetch existing todos when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchTodos();
});

// Fetch todos from backend
function fetchTodos() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((todos) => {
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = "";
      todos.forEach((todo) => addTodoToDOM(todo));
    })
    .catch((error) => console.error("Error fetching todos:", error));
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
  const todoList = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.innerHTML = `
        <input type="checkbox" ${
          todo.completed ? "checked" : ""
        } onchange="toggleTodo(${todo.id}, this.checked)">
        <span>${todo.title}</span>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
  todoList.appendChild(li);
}

// Add a new todo
document.getElementById("add-todo-btn").addEventListener("click", () => {
  const titleInput = document.getElementById("new-todo-title");
  const title = titleInput.value.trim();

  if (title) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description: "" }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        addTodoToDOM(newTodo);
        titleInput.value = "";
      })
      .catch((error) => console.error("Error adding todo:", error));
  }
});

// Toggle todo completion
function toggleTodo(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    })
    .catch((error) => {
      console.error("Error updating todo:", error);
      // Revert the checkbox state if the update failed
      const checkbox = document.querySelector(
        `input[onchange="toggleTodo(${id}, this.checked)"]`
      );
      if (checkbox) {
        checkbox.checked = !completed;
      }
    });
}

// Delete a todo
function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const todoElement = document.querySelector(
          `li:has(button[onclick="deleteTodo(${id})"])`
        );
        if (todoElement) {
          todoElement.remove();
        }
      } else {
        throw new Error("Failed to delete todo");
      }
    })
    .catch((error) => console.error("Error deleting todo:", error));
}
