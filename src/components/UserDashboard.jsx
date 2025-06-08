import React from "react";
import { useTaskContext } from "../context/TaskContext";
import UserTaskCard from "./UserTaskCard";

const UserDashboard = ({ userId }) => {
  const { tasks, getUserPoints } = useTaskContext();

  // Filter tasks assigned to this user
  const userTasks = tasks.filter((task) =>
    task.submissions.some((sub) => sub.userId === userId)
  );

  const userPoints = getUserPoints(userId);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        User Dashboard - <span className="text-blue-600">{userId}</span>
      </h1>

      <div className="mb-6 text-right text-lg font-semibold text-green-700">
        Total Points: {userPoints}
      </div>

      {userTasks.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-10">
          No tasks assigned.
        </p>
      ) : (
        <div className="space-y-6">
          {userTasks.map((task) => {
            const submission = task.submissions.find(
              (sub) => sub.userId === userId
            );
            return (
              <UserTaskCard
                key={task.id}
                task={task}
                submission={submission}
                userId={userId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
