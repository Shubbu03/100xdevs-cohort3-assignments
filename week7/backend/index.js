const express = require("express");
const app = express();
var dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const { userRoutes } = require("./routes/user.routes.js");
const { coursesRoutes } = require("./routes/courses.routes.js");
const { adminRoutes } = require("./routes/admin.routes.js");
const userAuth = require("./middlewares/user.middleware.js");
const adminAuth = require("./middlewares/admin.middleware.js");

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/course", coursesRoutes);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT);
  console.log(`listening on port ${process.env.PORT}`);
}

main();
