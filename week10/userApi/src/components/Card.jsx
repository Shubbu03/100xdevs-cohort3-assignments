/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Card({ pic, firstName, lastName }) {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
        <img
          src={pic}
          alt={`${firstName} ${lastName}`}
          className="rounded-lg w-full h-40 object-cover"
        />
        <div className="text-center mt-4">
          <h3 className="text-white text-lg font-bold">{firstName}</h3>
          <h3 className="text-white text-lg font-bold">{lastName}</h3>
        </div>
      </div>
    </>
  );
}

export default Card;
