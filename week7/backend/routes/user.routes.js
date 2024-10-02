const { Router } = require("express");
const userRoutes = Router();
const { userModel, purchaseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user.middleware");

const encrytPass = (password) => {
  return bcrypt.hash(password, 10);
};

userRoutes.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(401).json({
        message: "All fields are required !!",
      });
    }

    let hashedPassword = await encrytPass(password);

    const user = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });


    await user.save();

    return res.json({
      message: "New user signed up successfully!!",
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Error occured while signing up",
      error,
    });
  }
});

userRoutes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        process.env.JWT_SECRET_USER
      );

      res.status(201).json({
        message: "User signed in successfully",
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Error occurred while signing in",
      error,
    });
  }
});

userRoutes.get("/purchases", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
      userId,
    });
    res.json({
      message: "Your purchased courses",
      purchases,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occurred",
      error,
    });
  }
});

module.exports = {
  userRoutes,
};
