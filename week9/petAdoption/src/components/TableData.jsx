/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

function TableData() {
  const navigate = useNavigate();

  const formData = JSON.parse(localStorage.getItem("adoptionData")) || [];

  return (
    <div className="bg-gradient-to-b from-purple-600 to-purple-300 min-h-screen flex justify-center items-center">
      <div className="bg-white text-purple-600 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl mb-6 text-center">Adoption Details</h2>

        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Pet Name
              </th>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Pet Type
              </th>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Pet Breed
              </th>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Adopter Name
              </th>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Email
              </th>
              <th className="border-b-2 border-purple-500 px-4 py-2 text-left">
                Phone No.
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{data.petName}</td>
                <td className="border-b px-4 py-2">{data.petType}</td>
                <td className="border-b px-4 py-2">{data.petBreed}</td>
                <td className="border-b px-4 py-2">{data.adopterName}</td>
                <td className="border-b px-4 py-2">{data.email}</td>
                <td className="border-b px-4 py-2">{data.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Go Back to Main Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableData;
