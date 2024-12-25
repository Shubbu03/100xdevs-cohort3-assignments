import { useState } from "react";
import { ChevronDown, Filter, Menu, Star, Play, RotateCcw } from "lucide-react";

const PracticeListUI = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [showTags, setShowTags] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const questions = [
    {
      id: 14,
      title: "Longest Common Prefix",
      difficulty: "Easy",
      solved: true,
    },
    { id: 217, title: "Contains Duplicate", difficulty: "Easy", solved: true },
    { id: 125, title: "Valid Palindrome", difficulty: "Easy", solved: true },
    {
      id: 26,
      title: "Remove Duplicates from Sorted Array",
      difficulty: "Easy",
      solved: true,
    },
    { id: 66, title: "Plus One", difficulty: "Easy", solved: true },
    { id: 136, title: "Single Number", difficulty: "Easy", solved: true },
    {
      id: 121,
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      solved: true,
    },
    { id: 88, title: "Merge Sorted Array", difficulty: "Easy", solved: true },
    { id: 69, title: "Sqrt(x)", difficulty: "Easy", solved: true },
    { id: 206, title: "Reverse Linked List", difficulty: "Easy", solved: true },
    { id: 141, title: "Linked List Cycle", difficulty: "Easy", solved: true },
  ];

  const stats = {
    total: 19,
    solved: 19,
    acceptance: 85.42,
    submissions: 96,
    easy: { total: 11, solved: 11 },
    medium: { total: 7, solved: 7 },
    hard: { total: 1, solved: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 bg-gray-800 p-4 hidden md:block">
            <div className="mb-4">
              <h2 className="text-xl mb-2">My Lists</h2>
              <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
                <Star className="text-yellow-400" size={20} />
                <span>Favorite</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">
              {isMobileMenuOpen ? "Mobile View" : "Desktop View"}
            </h1>
          </div>

          {/* List Card */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-white p-3 rounded-lg mr-4">
                <Star className="text-yellow-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Favorite</h2>
                <p className="text-gray-400">
                  Shubbu · {stats.total} questions · Private{" "}
                  <ChevronDown className="inline" size={16} />
                </p>
              </div>
            </div>

            <button className="bg-white text-black px-4 py-2 rounded-full mr-2">
              <Play className="inline mr-1" size={16} /> Practice
            </button>

            {/* Progress Section */}
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg">Progress</h3>
                <button className="text-gray-400 hover:text-white">
                  <RotateCcw size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.solved}</div>
                      <div className="text-sm text-gray-400">Solved</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-green-400">
                    Easy {stats.easy.solved}/{stats.easy.total}
                  </div>
                  <div className="text-yellow-400">
                    Med. {stats.medium.solved}/{stats.medium.total}
                  </div>
                  <div className="text-red-400">
                    Hard {stats.hard.solved}/{stats.hard.total}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} />
              <select
                className="bg-gray-700 rounded px-3 py-1"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <button
              onClick={() => setShowTags(!showTags)}
              className="text-gray-400 hover:text-white"
            >
              Show tags
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-2">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>
                    {question.id}. {question.title}
                  </span>
                </div>
                <span className="text-green-400">{question.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeListUI;
