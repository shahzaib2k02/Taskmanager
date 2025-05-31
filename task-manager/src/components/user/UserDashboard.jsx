import React, { useEffect, useState } from "react";
import axios from "axios";
// UserHeader import removed as it will be handled by UserLayout

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id; // Assuming the user object has an _id field

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (!userId) {
        setError("User not logged in or user ID not found.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/tasks/user-tasks/${userId}`
        );
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching user tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTasks();
  }, [userId]);

  const handleMarkComplete = async (taskId) => {
    if (!userId) {
      setError("User not logged in or user ID not found.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        { userId } // Pass userId in the request body
      );
      // Update the task status in the frontend
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (err) {
      console.error("Error marking task complete:", err);
      setError("Failed to mark task as complete. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* UserHeader component removed from here */}
      <main className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          My Assigned Tasks
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks assigned to you yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : task.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </span>
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                {task.status !== "Completed" && (
                  <button
                    onClick={() => handleMarkComplete(task._id)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
