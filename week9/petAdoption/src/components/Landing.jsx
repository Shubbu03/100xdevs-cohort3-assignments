/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetAdoptionForm from "./PetAdoptionForm";

function Landing() {
  const navigate = useNavigate();
  const [showFormModal, setShowFormModal] = useState(false);

  const handleAdoptClick = () => {
    setShowFormModal(true);
  };

  const closeModal = () => {
    setShowFormModal(false);
  };

  const handleViewData = () => {
    const existingData = JSON.parse(localStorage.getItem("adoptionData"));
    if (existingData && existingData.length > 0) {
      navigate("/data");
    } else {
      alert("No adoption data available.");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-purple-600 to-purple-300 w-full h-screen flex flex-col justify-center items-center text-white">
        <main className="text-center">
          <h1 className="text-6xl font-bold mb-4 mt-[-10rem]">
            Give them a new home.
          </h1>
          <p className="text-lg font-light mb-8">
            Help find a loving home for animals in need. Your support makes a
            difference.
          </p>
          <div className="space-x-4">
            <button
              className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-900 transition"
              onClick={handleAdoptClick}
            >
              Adopt Now
            </button>
            <button
              className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-900 transition"
              onClick={handleViewData}
            >
              View Data
            </button>
          </div>
          {showFormModal && <PetAdoptionForm closeModal={closeModal} />}
        </main>
      </div>
    </>
  );
}

export default Landing;
