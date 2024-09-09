const mongoose = require("mongoose");
// import mongoose from "mongoose";

// Connect to MongoDB
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI
    );

    if (!connection) {
      console.log(`Error connecting to database`);
    }

    console.log(`Database Connected!!`);
  } catch (err) {
    console.log(`Error connecting to database!!`, err);
  }
};

// Define schemas

const TodoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!!"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address!!"],
  },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: [TodoSchema],
  },
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  dbConnect,
  User,
  Todo,
};
