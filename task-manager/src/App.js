import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./components/admin/AdminDashboard";
import Analytics from "./components/admin/Analytics";
import TaskForm from "./components/admin/TaskForm";
import TaskList from "./components/admin/TaskList";
import EditTask from "./components/admin/EditTask";
import UserList from "./components/admin/UserList";
import UserDashboard from "./components/user/UserDashboard";
import UserHeader from "./components/user/UserHeader";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <AdminDashboard>
      <Outlet />
    </AdminDashboard>
  );
}
function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<Analytics />} />
          <Route path="tasks/form" element={<TaskForm />} />
          <Route path="tasks/list" element={<TaskList />} />
          <Route path="tasks/edit/:id" element={<EditTask />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
