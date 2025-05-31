import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">TaskManager</div>
      <div className="space-x-4">
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
