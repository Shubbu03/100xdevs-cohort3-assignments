/* eslint-disable no-unused-vars */
import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Courses from "../components/Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default Home;
