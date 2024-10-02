/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, course, onSave }) => {
  const [editedCourse, setEditedCourse] = useState(course);

  useEffect(() => {
    setEditedCourse(course);
  }, [course]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedCourse);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={editedCourse?.title || ""}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, title: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={editedCourse?.description || ""}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input
            type="text"
            value={editedCourse?.price || ""}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, price: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={editedCourse?.imageUrl || ""}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, imageUrl: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
