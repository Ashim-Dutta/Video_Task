// File: /App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import VerifierPanel from "./components/VerifierPanal";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  // For demo: selected user to simulate login (user1 to user10)
  const [currentUser, setCurrentUser] = useState("Ashim");

  const users = [
    "Ashim",
    "Aman",
    "Anupam",
    "Sourav",
    "Rajat",
    "Raju",
    "Monisha",
    "Anil",
    "Sani",
    "Roma",
  ];

  return (
    <TaskProvider>  
      <Router>
        <header className="bg-white shadow-md p-4 sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/user"
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                User Dashboard
              </Link>
              <Link
                to="/verifier"
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                Verifier Panel
              </Link>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* User Switcher */}
            <div className="flex items-center space-x-3">
              <label
                htmlFor="user-select"
                className="text-gray-600 font-medium whitespace-nowrap"
              >
                Switch User:
              </label>
              <select
                id="user-select"
                value={currentUser}
                onChange={(e) => setCurrentUser(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {users.map((userId) => (
                  <option key={userId} value={userId}>
                    {userId}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard userId={currentUser} />} />
            <Route path="/verifier" element={<VerifierPanel />} />
          </Routes>
        </main>
      </Router>
    </TaskProvider>
  );
};

export default App;
