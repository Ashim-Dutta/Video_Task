import React from "react";

const statusStyles = {
  approved: "bg-green-100 text-green-800 font-semibold",
  rejected: "bg-red-100 text-red-800 font-semibold",
  pending: "bg-yellow-100 text-yellow-800 font-semibold",
};

const TaskTable = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Task Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Assigned Users (Status)
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center py-6 text-gray-500 italic select-none"
              >
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 align-top whitespace-normal text-gray-800 font-medium max-w-xs">
                  {task.title}
                </td>
                <td className="px-4 py-4 align-top whitespace-normal text-gray-700 max-w-xl hidden sm:table-cell">
                  {task.description}
                </td>
                <td className="px-4 py-4 align-top max-w-sm">
                  {task.submissions.map((submission) => (
                    <div
                      key={submission.userId}
                      className="flex items-center justify-between mb-2 last:mb-0"
                    >
                      <span className="text-gray-900 font-semibold">
                        {submission.userId}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs ${statusStyles[submission.status] || ""
                          }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
