let todos = []; // in memory space

export async function getAllTodo(req, res, next) {
  try {
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { title, description } = req.body;
    const newTodo = {
      id: todos.length + 1,
      title,
      description,
      completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      title: title || todos[todoIndex].title,
      description: description || todos[todoIndex].description,
      completed:
        completed !== undefined ? completed : todos[todoIndex].completed,
    };

    res.status(200).json(todos[todoIndex]);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    todos = [];
    res.status(200).json({ message: "All todos deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodoById(req, res, next) {
  try {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function searchTodo(req, res, next) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchResults = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase()) ||
        todo.description.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
}
