/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("create");
  const [userPurchasedCourse, setUserPurchasedCourse] = useState([]);

  const handleEnroll = async (course) => {
    try {
      const data = await axios.post(
        "http://localhost:3000/course/purchases",
        {
          courseId: course._id,
        },
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      if (!data) {
        console.log(`Error occured!!`);
      }
      console.log(`ori course`, course);
      console.log(`Course purchased`, data);
    } catch (err) {
      console.log(`Error occured while purchasing course, try again: ${err}`);
    }
  };

  const getUserPurchasedCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/purchases", {
        headers: {
          token: `${token}`,
        },
      });
      if (!response) {
        console.log(`Error fetching,try again`);
      }
      console.log(`user courses`, response.data.purchases);
      setUserPurchasedCourse(response.data.purchases);
    } catch (e) {
      console.log(`Error occured while fetching courses: ${e}`);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/course/preview");
      if (!response || !response.data.courses) {
        console.log("Error fetching course");
        return;
      }
      setCourses(response.data.courses);
    } catch (err) {
      console.log(`Error occurred while fetching courses, try again: ${err}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    getAllCourses();
  }, []);

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
          onClick={() => {
            setActiveTab("create");
            getAllCourses();
          }}
          className={`px-5 py-2 mr-3 ${
            activeTab === "create"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black"
          } border-none cursor-pointer`}
        >
          View Courses
        </button>
        <button
          onClick={() => {
            setActiveTab("view");
            getUserPurchasedCourses();
          }}
          className={`px-5 py-2 ${
            activeTab === "view"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black"
          } border-none cursor-pointer`}
        >
          My Courses
        </button>
      </div>

      {activeTab === "create" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {courses.length < 1 ? (
            <>
              <div>No course available!!</div>
            </>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
                  {course.title}
                </h3>
                <p style={{ color: "#666", marginBottom: "15px" }}>
                  Price : {course.price}
                </p>
                <button
                  onClick={() => handleEnroll(course)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Enroll
                </button>
              </div>
            ))
          )}
        </div>
      ) : userPurchasedCourse.length < 1 ? (
        <div>You have not purchased any courses</div>
      ) : (
        // <div>your purchased courses</div>
        userPurchasedCourse.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              {course._id}
            </h3>
            <p style={{ color: "#666", marginBottom: "15px" }}>
              by : {course.userId}
            </p>
            <button
              onClick={() => handleEnroll(course)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default UserDashboard;
