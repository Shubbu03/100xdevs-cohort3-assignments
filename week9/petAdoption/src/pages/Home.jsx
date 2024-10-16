/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../components/Landing";
import TableData from "../components/TableData";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/data" element={<TableData />} />
        </Routes>
      </Router>
    </>
  );
}

export default Home;
