/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PetAdoptionForm({ closeModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    adopterName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "petName":
      case "petBreed":
      case "adopterName":
        if (value.length < 3) {
          error = `${name.replace(
            /([A-Z])/g,
            " $1"
          )} must be at least 3 characters long.`;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "phoneNumber":
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          error = "Phone number must be a valid 10-digit number.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const error = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    if (Object.keys(newErrors).length === 0) {
      const existingData =
        JSON.parse(localStorage.getItem("adoptionData")) || [];
      existingData.push(formData);
      localStorage.setItem("adoptionData", JSON.stringify(existingData));

      navigate("/data");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-purple-600 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-4 right-4 text-purple-600 font-bold text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-6 text-center">Adoption Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.petName ? "border-red-500" : "border-purple-300"
              } rounded-lg`}
              placeholder="Pet Name"
            />
            {errors.petName && (
              <p className="text-red-500 text-sm">{errors.petName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Pet Type</label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-300 rounded-lg"
            >
              <option value="">Select Pet Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Pet Breed</label>
            <input
              type="text"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.petBreed ? "border-red-500" : "border-purple-300"
              } rounded-lg`}
              placeholder="Pet Breed"
            />
            {errors.petBreed && (
              <p className="text-red-500 text-sm">{errors.petBreed}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Your Name</label>
            <input
              type="text"
              name="adopterName"
              value={formData.adopterName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.adopterName ? "border-red-500" : "border-purple-300"
              } rounded-lg`}
              placeholder="Your Name"
            />
            {errors.adopterName && (
              <p className="text-red-500 text-sm">{errors.adopterName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-purple-300"
              } rounded-lg`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-left">Phone No.</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-purple-300"
              } rounded-lg`}
              placeholder="Phone No."
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition w-full"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition w-full"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetAdoptionForm;
