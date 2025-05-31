import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Header />
        <div className="p-6">
          <Outlet />{" "}
          {/* Renders Analytics, TaskForm, or UserList based on route */}
        </div>
      </div>
    </div>
  );
}
