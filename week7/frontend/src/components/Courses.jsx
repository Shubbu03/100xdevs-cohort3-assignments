/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const Courses = () => {
  let role = localStorage.getItem("role");

  return <>{role == "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default Courses;
