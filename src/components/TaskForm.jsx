import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const { createTask } = useTaskContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUsers, setAssignedUsers] = useState("");
  const [points, setPoints] = useState(10); // Default points

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !assignedUsers.trim()) {
      alert("Please enter task title and assigned users.");
      return;
    }
    if (points <= 0) {
      alert("Points must be greater than 0.");
      return;
    }

    const usersArray = assignedUsers.split(",").map((u) => u.trim());

    createTask(title, description, usersArray, points);

    setTitle("");
    setDescription("");
    setAssignedUsers("");
    setPoints(10);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-semibold mb-2">Task Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Enter task description (optional)"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Assign Users (comma separated userIds)
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={assignedUsers}
          onChange={(e) => setAssignedUsers(e.target.value)}
          placeholder="e.g. user1, user2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Reward Points</label>
        <input
          type="number"
          min="1"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          required
          placeholder="Enter reward points"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
