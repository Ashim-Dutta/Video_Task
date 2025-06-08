import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import { useTaskContext } from "../context/TaskContext";
import { FiFilter, FiPlus } from "react-icons/fi";

const AdminDashboard = () => {
  const { tasks } = useTaskContext();

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  // PIN logic
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const correctPin = "admin321"; // Change as needed

  const handlePinCheck = () => {
    if (pinInput === correctPin) {
      setPinVerified(true);
    } else {
      alert("Incorrect Admin PIN");
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) =>
          task.submissions.some((sub) => sub.status === filter)
        );

  // PIN screen
  if (!pinVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {/* Added px-4 for padding on mobile */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Enter Admin PIN</h2>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            onClick={handlePinCheck}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Actual Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        {/* On mobile stack vertically with spacing */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition w-full sm:w-auto justify-center"
          /* On mobile full width button */
        >
          <FiPlus className="mr-2" />
          {showForm ? "Close Form" : "Add Task"}
        </button>
      </header>

      {showForm && (
        <div className="mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <TaskForm />
        </div>
      )}

      <section className="mb-6 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Stack filter vertically on mobile */}
        <label
          htmlFor="filter"
          className="flex items-center text-gray-700 font-semibold space-x-2"
        >
          <FiFilter />
          <span>Filter Tasks:</span>
        </label>

        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
          value={filter}
          /* Full width on mobile, auto width on desktop */
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </section>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-auto max-h-[600px]">
        {/* overflow-auto allows horizontal scroll on small screens */}
        <TaskTable tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default AdminDashboard;
