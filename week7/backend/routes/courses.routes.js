const { Router } = require("express");
const coursesRoutes = Router();

const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user.middleware");

coursesRoutes.post("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const newCourse = await purchaseModel.create({
    userId,
    courseId,
  });

  if (!newCourse) {
    res.status(401).json({
      message: "Error buying course",
    });
  }

  res.json({
    message: "Course purchased",
    data: newCourse,
  });
});

coursesRoutes.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});

  res.json({
    message: "All the courses by different creators are",
    courses: courses,
  });
});

module.exports = {
  coursesRoutes,
};
