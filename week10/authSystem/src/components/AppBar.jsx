/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const AppBar = ({ username }) => {
  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        {username ? (
          <span>Welcome, {username}!</span>
        ) : (
          <span>Please log in</span>
        )}
      </div>
    </div>
  );
};

export default AppBar;