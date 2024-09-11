const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

app.use("/user", userRoutes); 
app.use("/todos", todoRoutes);

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
