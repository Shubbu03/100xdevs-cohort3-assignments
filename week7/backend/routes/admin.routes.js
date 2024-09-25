const { Router } = require("express");
const adminRoutes = Router();
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const encrytPass = (password) => {
  return bcrypt.hash(password, 10);
};

adminRoutes.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(401).json({
        message: "All fields are required!!",
      });
    }

    let hashedPassword = await encrytPass(password);

    const admin = new adminModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    if (!admin) {
      res.status(401).json({
        message:
          "Error occured while signing up new admin user, please try again",
        error,
      });
    }

    await admin.save();

    res.json({
      message: "New admin user signed up successfully!!",
      data: admin,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured while signing up",
      error,
    });
  }
});

adminRoutes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    console.log("admin", admin);
    if (!admin) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("isMatch", isMatch);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: admin._id.toString(),
        },
        process.env.JWT_SECRET_ADMIN
      );

      res.status(201).json({
        message: "Admin User signed in successfully",
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Error occured while signing in",
      error,
    });
  }
});

adminRoutes.post("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;

    const { title, description, price, imageUrl } = req.body;

    const newCourse = new courseModel({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });

    if (!newCourse) {
      req.status(401).json({
        message: "Error occured while creating course",
      });
    }

    await newCourse.save();

    res.json({
      message: "Course created",
      data: newCourse,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured while creating course,try again",
      error,
    });
  }
});

adminRoutes.put("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;

    console.log("data", req.body);

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    const result = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        $set: {
          title,
          description,
          price,
          imageUrl,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Course not found or you don't have permission to update it",
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({
        message: "No changes were made to the course",
      });
    }

    const updatedCourse = await courseModel.findById(courseId);

    res.json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      message: "Error occurred while editing course",
      error: error.message,
    });
  }
});

adminRoutes.get("/course/bulk", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;

    const course = await courseModel.find({
      creatorId: adminId,
    });

    console.log("courses", course);

    if (!course) {
      req.status(401).json({
        message: "Can't find any courses",
      });
    }

    res.json({
      message: "Courses fetched",
      courses: course,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured while fetching courses",
      error,
    });
  }
});

module.exports = {
  adminRoutes,
};
