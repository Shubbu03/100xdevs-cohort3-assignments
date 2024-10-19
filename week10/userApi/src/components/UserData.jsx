/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import CardGrid from "./Card";

function UserData() {
  const [data, setData] = useState([]);

  const [visibleUsers, setVisibleUsers] = useState(10);
  const usersPerPage = 10;

  const loadMoreUsers = () => {
    setVisibleUsers((prevVisible) => prevVisible + usersPerPage);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / usersPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
    setVisibleUsers(usersPerPage * page);
  };

  const fetchUserData = async () => {
    const response = await axios.get(
      "https://randomuser.me/api/?results=30&seed=abc"
    );

    if (response.status == 200) {
      setData(response.data.results);
    } else {
      alert("Error occured while fetching user data!!");
      return;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-700">
      <div>
        <h1 className="font-bold text-4xl text-white text-center p-8">
          Random User Data
        </h1>
      </div>
      <div className=" h-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.slice(0, visibleUsers).map((user, i) => (
            <Card
              key={i}
              pic={user.picture.medium}
              firstName={user.name.first}
              lastName={user.name.last}
            />
          ))}
        </div>
        {visibleUsers < data.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreUsers}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}

        {visibleUsers >= data.length && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => changePage(pageIndex + 1)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === pageIndex + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                } hover:bg-blue-500 transition duration-300`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserData;
