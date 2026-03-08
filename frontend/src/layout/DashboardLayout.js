import React from "react";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-60 bg-white shadow-md p-5">

        <h1 className="text-xl font-bold mb-6">
          AI Prompt
        </h1>

        <nav className="flex flex-col gap-3">

          <Link className="hover:text-blue-600" to="/prompts">
            Generate Prompt
          </Link>

          <Link className="hover:text-blue-600" to="/history">
            Prompt History
          </Link>

          <Link className="hover:text-blue-600" to="/profile">
            Profile
          </Link>

        </nav>

      </div>

      {/* Main content */}

      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}