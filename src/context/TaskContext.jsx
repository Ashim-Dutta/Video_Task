import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Create a new task and assign to multiple users, with custom points
  const createTask = (title, description, assignedUsers, points) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      points, // store points per task
      submissions: assignedUsers.map((userId) => ({
        userId,
        status: "pending",
        videoURL: null,
        points: 0,
      })),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Update a user's submission on a task
  const updateSubmission = (taskId, userId, updates) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          submissions: task.submissions.map((sub) => {
            if (sub.userId !== userId) return sub;
            return {
              ...sub,
              ...updates,
            };
          }),
        };
      })
    );
  };

  const filterTasksByStatus = (statusFilter) => {
    if (statusFilter === "all") return tasks;
    return tasks.filter((task) =>
      task.submissions.some((sub) => sub.status === statusFilter)
    );
  };

  // Calculate total points for a user (optional)
  const getUserPoints = (userId) => {
    return tasks.reduce((sum, task) => {
      const sub = task.submissions.find((s) => s.userId === userId);
      return sub ? sum + (sub.points || 0) : sum;
    }, 0);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateSubmission,
        filterTasksByStatus,
        getUserPoints,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
