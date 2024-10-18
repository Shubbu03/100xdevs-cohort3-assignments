/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

export default function TimerApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const calculateTime = (hours, minutes, seconds) => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    return isNaN(totalSeconds) ? 0 : totalSeconds;
  };

  const handleEditField = (field) => {
    if (editState?.field === field) {
      const newTime = {
        ...formatTime(time),
        [field]: editState.value.padStart(2, "0"),
      };
      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );
      setTime(calculatedTime);
      setEditState(null);
    } else {
      setIsRunning(false);
      setEditState({
        field,
        value: formatTime(time)[field].replace(/^0/, ""),
      });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.slice(0, 2);
    if (/^\d{0,2}$/.test(value)) {
      setEditState({ ...editState, value });
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setEditState(null);
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Timer App</h1>
      <div className="text-6xl mb-4 flex items-center">
        {["hours", "minutes", "seconds"].map((field) => (
          <React.Fragment key={field}>
            {editState?.field === field ? (
              <input
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField(field)}
                className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <span
                onClick={() => handleEditField(field)}
                className="cursor-pointer hover:bg-gray-200 rounded-md px-2 transition-colors duration-300"
              >
                {formatTime(time)[field]}
              </span>
            )}
            {field !== "seconds" && <span className="mx-2">:</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
            isRunning
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
