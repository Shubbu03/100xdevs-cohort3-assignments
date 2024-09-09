const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { dbConnect, User } = require("../database/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

// User Routes
router.post("/signup", async (req, res) => {
  dbConnect();
  const { email, password } = req.body;

  if (!email || !password) {
    console.log(`Both email and password are required!!`);
  }

  const checkExistingEmail = await User.findOne({ email });

  if (checkExistingEmail) {
    return res.status(401).json({
      message:
        "User already exists with the current email, please change the email to proceed",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  if (!user) {
    return res
      .status(502)
      .json({ message: "Error creating new user , please try again" });
  }

  await user.save();

  return res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  dbConnect();
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(`Both email and password are required!!`);
  }

  const checkExistingEmail = await User.findOne({ email });

  if (!checkExistingEmail) {
    return res.status(401).json({
      message:
        "User with the current email not found, please change the email to proceed",
    });
  }

  const token = jwt.sign({ email }, jwt_secret);

  if (!token) {
    return res.status(502).json({
      message: "Error creating token, try again",
    });
  }

  return res
    .status(201)
    .json({ message: "User with current email signed in!!", token: token });
});

router.get("/todos", userMiddleware, async (req, res) => {
  dbConnect();
  const email = req.email;

  if (!email) {
    return res.status(401).json({ message: "Email not found!!" });
  }

  const data = await User.findOne({ email });

  if (!data) {
    return res.status(401).json({ message: "User not found!!" });
  }

  if (!data.todos.length) {
    return res.status(201).json({ message: "You don't have any todos" });
  } else {
    return res.status(201).json({
      message: `You have ${data.todos.length} todos`,
      todos: data.todos,
    });
  }
});

router.post("/logout", userMiddleware, (req, res) => {
  dbConnect();
  req.email = "";
  req.headers.token = "";

  return res.status(201).json({ message: "User logged out successfully!!" });
});

module.exports = router;
