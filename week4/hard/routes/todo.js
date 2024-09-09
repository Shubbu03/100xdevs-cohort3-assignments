const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { dbConnect, User } = require("../database");
const router = Router();

// todo Routes

let idVar = 1;
router.post("/add-todo", userMiddleware, async (req, res) => {
  dbConnect();
  const { title, description } = req.body;
  const email = req.email;

  console.log(`USER EMAIL FORM TODOS:: ${email}`);

  if (!title || !description) {
    return res.status(401).json({
      message: "Both title and description are required to add a todo",
    });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User with this email not found, try again",
    });
  }

  user.todos.push({
    id: idVar,
    title: title,
    description: description,
  });

  idVar += 1;
  await user.save();

  return res.status(201).json({ message: "Todo added successfully" });
});

router.get("/get-todo", userMiddleware, async (req, res) => {
  dbConnect();
  const email = req.email;

  if (!email) {
    return res.status(401).json({ message: "Email not found" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const todos = user.todos;
  if (!todos.length) {
    return res.status(201).json({ message: "You don't have any todos" });
  } else {
    return res.status(201).json({ message: "Your todos are", todos: todos });
  }
});

router.get("/get-todos/:id", userMiddleware, async (req, res) => {
  dbConnect();
  const { id } = req.body;
  const email = req.email;

  if (!email) {
    return res.status(401).json({ message: "Email not found" });
  }

  if (!id) {
    return res.status(404).json({ message: "Id not found" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  let todo = [];

  for (let i = 0; i < user.todos.length; i++) {
    if (user.todos[i].id === id) {
      todo.push(user.todos[i]);
    }
  }

  if (!todo.length) {
    return res.status(401).json({ message: "No todo with this id found" });
  }

  return res.status(201).json({ message: "Todo found", todo: todo });
});

router.put("/update-todo", userMiddleware, async (req, res) => {
  dbConnect();

  const { updatedTitle, updatedDescription, id } = req.body;
  const email = req.email;

  if (!updatedTitle || !updatedDescription) {
    return res.status(401).json({
      message: "Both title and description are required to update a todo",
    });
  }

  //   const user = await User.findOne({ email });

  //   const data = await User.findOneAndUpdate(email, {
  //     title: updatedTitle,
  //     description: updatedDescription,
  //   });

  const data = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        title: updatedTitle,
        description: updatedDescription,
      },
    },
    {
      upsert: true,
      returnDocument: "after", // this is new !
    }
  );

  if (!data) {
    return res.status(401).json({
      message: "error updating data,try again",
    });
  }

  await data.save();

  return res
    .status(201)
    .json({ message: "Todo updated successfully", todo: data });
});

router.put("/update-todo-status", userMiddleware, async (req, res) => {
  dbConnect();
  const { id } = req.body;
  const email = req.email;

  if (!email) {
    return res.status(401).json({ message: "Email not found" });
  }

  if (!id) {
    return res.status(404).json({ message: "Id not found" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  for (let i = 0; i < user.todos.length; i++) {
    if (user.todos[i].id === id) {
      user.todos[i].completed = true;
    }
  }

  await user.save();

  return res.status(201).json({ message: "Todo status updated" });
});

router.delete("/delete-todo", userMiddleware, async (req, res) => {
  dbConnect();
  const email = req.email;
  if (!email) {
    return res.status(401).json({
      message: "Email not found",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User with this email not found, try again",
    });
  }

  const emptyTodo = user.todos.splice(0, user.todos.length);

  if (!emptyTodo) {
    return res.status(401).json({
      message: "Error deleting todos",
    });
  }

  await user.save();
  return res.status(201).json({
    message: "Deleted all todos",
  });
});

router.delete("/delete-todo/:id", userMiddleware, async (req, res) => {
  dbConnect();
  const { id } = req.body;
  const email = req.email;

  if (!email) {
    return res.status(401).json({ message: "Email not found" });
  }

  if (!id) {
    return res.status(404).json({ message: "Id not found" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  let todo = [];

  for (let i = 0; i < user.todos.length; i++) {
    if (user.todos[i].id !== id) {
      todo.push(user.todos[i]);
    }
  }

  user.todos = todo;

  await user.save();

  return res.status(201).json({ message: "Todo found", todo: user.todos });
});

module.exports = router;
