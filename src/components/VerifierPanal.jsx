import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const VerifierPanel = () => {
  const { tasks, updateSubmission } = useTaskContext();
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const correctPin = "verifier123"; // Change as needed

  const handleVerifyPin = () => {
    if (pinInput === correctPin) {
      setPinVerified(true);
    } else {
      alert("Incorrect PIN");
    }
  };

  if (!pinVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Enter Verifier PIN</h2>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            onClick={handleVerifyPin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Pending submissions with videos
  const pendingSubmissions = tasks.flatMap((task) =>
    task.submissions
      .filter((sub) => sub.status === "pending" && sub.videoURL)
      .map((sub) => ({
        taskId: task.id,
        taskTitle: task.title,
        userId: sub.userId,
        videoURL: sub.videoURL,
        taskPoints: task.points || 0,
      }))
  );

  const handleDecision = (taskId, userId, decision) => {
    const task = tasks.find((t) => t.id === taskId);
    const awardedPoints = decision === "approved" ? (task?.points || 0) : 0;

    updateSubmission(taskId, userId, {
      status: decision,
      points: awardedPoints,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">
        Verifier Panel
      </h2>

      {pendingSubmissions.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-12">
          No pending videos to verify.
        </p>
      ) : (
        <div className="space-y-8">
          {pendingSubmissions.map(({ taskId, taskTitle, userId, videoURL }) => (
            <div
              key={`${taskId}-${userId}`}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {taskTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                User: <strong className="text-gray-900">{userId}</strong>
              </p>

              <video
                src={videoURL}
                controls
                className="w-full max-w-3xl rounded-md border border-gray-300 mb-6"
              />

              <div className="flex space-x-4">
                <button
                  onClick={() => handleDecision(taskId, userId, "approved")}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md shadow hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(taskId, userId, "rejected")}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md shadow hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifierPanel;
