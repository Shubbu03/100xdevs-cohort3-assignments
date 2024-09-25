const { Router } = require("express");
const coursesRoutes = Router();

const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user.middleware");

coursesRoutes.post("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "Course purchased",
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
