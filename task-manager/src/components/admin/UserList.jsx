import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const normalUsers = res.data.filter((user) => user.role === "user");
      setUsers(normalUsers);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
        User List
      </h2>
      {error && (
        <p className="text-center text-red-600 bg-red-100 p-2 rounded mb-6">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-xl font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            </div>

            {user.assignedTasks && user.assignedTasks.length > 0 ? (
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-2">
                  Assigned Tasks:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 max-h-40 overflow-y-auto">
                  {user.assignedTasks.map((task) => (
                    <li
                      key={task._id}
                      className="hover:text-blue-500 cursor-pointer"
                      title={task.title}
                    >
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No tasks assigned</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
