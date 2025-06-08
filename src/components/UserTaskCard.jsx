// File: /components/UserTaskCard.jsx
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const statusColors = {
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const UserTaskCard = ({ task, submission, userId }) => {
  const { updateSubmission } = useTaskContext();
  const [videoURL, setVideoURL] = useState(submission.videoURL || "");
  const [uploading, setUploading] = useState(false);

  const canUpload =
    submission.status === "pending" || submission.status === "rejected";

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate video upload by creating a local URL (for demo)
    const url = URL.createObjectURL(file);
    setUploading(true);

    setTimeout(() => {
      updateSubmission(task.id, userId, { videoURL: url, status: "pending" });
      setUploading(false);
      setVideoURL(url);
    }, 1000);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-4">{task.description}</p>

      <p className="mb-4">
        Status:{" "}
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[submission.status]}`}
        >
          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
        </span>
      </p>

      {videoURL ? (
        <video
          src={videoURL}
          controls
          className="w-full max-w-lg rounded border border-gray-300 mb-4"
        />
      ) : (
        !canUpload && (
          <p className="text-gray-500 italic mb-4">No video uploaded yet.</p>
        )
      )}

      {canUpload && (
        <label
          htmlFor={`upload-${task.id}`}
          className={`inline-block cursor-pointer text-blue-600 font-medium hover:underline select-none ${
            uploading ? "opacity-60 cursor-wait" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload / Re-upload Video"}
          <input
            type="file"
            id={`upload-${task.id}`}
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};

export default UserTaskCard;
