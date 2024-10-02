/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modal";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState("");
  const [courseDetail, setCourseDetail] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [activeTab, setActiveTab] = useState("create");
  const [shouldFetchCourses, setShouldFetchCourses] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");
    navigate("/login");
  };

  const editCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/course`,
        {
          courseId: updatedCourse._id,
          title: updatedCourse.title,
          description: updatedCourse.description,
          price: updatedCourse.price,
          imageUrl: updatedCourse.imageUrl,
        },
        {
          headers: {
            token: ` ${token}`,
          },
        }
      );
      setShouldFetchCourses(!shouldFetchCourses);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const getUserCreatedCourses = async () => {
    try {
      const userCourse = await axios.get(
        "http://localhost:3000/admin/course/bulk",
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      if (!userCourse) {
        console.log(`Error getting courses`);
      }
      setCourses(userCourse.data.courses);
      console.log("courses", userCourse.data.courses);
    } catch (error) {
      console.log(`Error occured while fetching courses : ${error}`);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `http://localhost:3000/admin/course`,
        courseDetail,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      if (!data) {
        console.log(`Error posting course`);
      }
      console.log(`Course created with data: ${courseDetail}`);
      setCourseDetail({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
      });
      navigate("/courses");
    } catch (err) {
      console.log(`Error occured while creating course, try again!! ${err}`);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Course Seller</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="mb-5">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-5 py-2 mr-3 ${
            activeTab === "create"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black"
          } border-none cursor-pointer`}
        >
          Create Course
        </button>
        <button
          onClick={() => {
            setActiveTab("view");
            getUserCreatedCourses();
          }}
          className={`px-5 py-2 ${
            activeTab === "view"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black"
          } border-none cursor-pointer`}
        >
          View Courses
        </button>
      </div>

      {activeTab === "create" ? (
        <div className="border border-gray-300 p-5 rounded-md">
          <h2 className="text-lg mb-2">Create a New Course</h2>
          <p className="mb-5">Enter the details for your new course below.</p>
          <div className="mb-5">
            <label htmlFor="courseTitle" className="block mb-1">
              Course Title
            </label>
            <input
              id="courseTitle"
              type="text"
              placeholder="Enter course title"
              value={courseDetail.title}
              onChange={(e) =>
                setCourseDetail((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="courseDescription" className="block mb-1">
              Course Description
            </label>
            <input
              id="courseDescription"
              type="text"
              placeholder="Enter course description"
              value={courseDetail.description}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="coursePrice" className="block mb-1">
              Course Price
            </label>
            <input
              id="coursePrice"
              type="text"
              placeholder="Enter course price"
              value={courseDetail.price}
              onChange={(e) =>
                setCourseDetail((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="courseImageUrl" className="block mb-1">
              Course Image URL
            </label>
            <input
              id="courseImageUrl"
              type="text"
              placeholder="Enter course image url"
              value={courseDetail.imageUrl}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  imageUrl: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleCreateCourse}
            className="px-5 py-2 bg-green-600 text-white rounded-md cursor-pointer"
          >
            Create Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {courses.length <= 1 ? (
            <div>You dont have any courses</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="flex items-center justify-center">
                <div className="border border-gray-300 p-5 rounded-md w-full max-w-md bg-white shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                      <p className="text-gray-500 mr-2">{course.price}</p>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaPencilAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            course={currentCourse}
            onSave={editCourse}
          />
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
