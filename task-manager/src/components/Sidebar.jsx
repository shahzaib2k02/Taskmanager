import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-300 shadow-lg p-6">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard/my-tasks"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          🗂 My Tasks
        </NavLink>
      </nav>
    </aside>
  );
}
