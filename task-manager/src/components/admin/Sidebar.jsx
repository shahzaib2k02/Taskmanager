import { FaTasks, FaUser, FaChartPie } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [taskOpen, setTaskOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>
      <nav className="space-y-4">
        <Link
          to="/admin-dashboard"
          className={`flex items-center space-x-3 text-sm font-medium p-2 rounded-md ${
            isActive("/admin-dashboard")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaChartPie />
          <span>Analytics</span>
        </Link>

        {/* Dropdown for Tasks */}
        <div>
          <button
            onClick={() => setTaskOpen(!taskOpen)}
            className={`w-full flex items-center justify-between text-sm font-medium p-2 rounded-md ${
              location.pathname.includes("/admin-dashboard/tasks")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center space-x-3">
              <FaTasks />
              <span>Tasks</span>
            </span>
            <span>{taskOpen ? "▾" : "▸"}</span>
          </button>

          {taskOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin-dashboard/tasks/form"
                className={`block text-sm ${
                  isActive("/admin-dashboard/tasks/form")
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Add Task
              </Link>
              <Link
                to="/admin-dashboard/tasks/list"
                className={`block text-sm ${
                  isActive("/admin-dashboard/tasks/list")
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Task List
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin-dashboard/users"
          className={`flex items-center space-x-3 text-sm font-medium p-2 rounded-md ${
            isActive("/admin-dashboard/users")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaUser />
          <span>Users</span>
        </Link>
      </nav>
    </aside>
  );
}
