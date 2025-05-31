import { useEffect, useState, Fragment } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [assignError, setAssignError] = useState("");

  const limit = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const fetchTasks = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/tasks?page=${pageNumber}&limit=${limit}`);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch tasks");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const normalUsers = res.data.filter((user) => user.role === "user");
      setUsers(normalUsers);
    } catch (err) {
      setAssignError("Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks(page);
    } catch {
      alert("Delete failed");
    }
  };

  const openAssignModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsAssignModalOpen(true);
    fetchUsers();
  };

  const handleAssignTask = async () => {
    if (!selectedUserId) {
      setAssignError("Please select a user.");
      return;
    }
    try {
      await api.put(`/tasks/${selectedTaskId}/assign`, {
        userId: selectedUserId,
      });
      closeAssignModal();
      fetchTasks(page);
    } catch {
      setAssignError("Assignment failed");
    }
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedUserId("");
    setSelectedTaskId(null);
    setAssignError("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 font-medium";
      case "In Progress":
        return "text-yellow-600 font-medium";
      default:
        return "text-gray-600 font-medium";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Task List</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="bg-white shadow-sm p-4 rounded border flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Due: {task.dueDate?.substring(0, 10)} | Priority:{" "}
                    {task.priority}
                  </p>
                  <p className={`text-sm mt-1 ${getStatusColor(task.status)}`}>
                    Status: {task.status}
                  </p>
                  {task.assignedTo && (
                    <p className="text-sm text-blue-500 mt-1">
                      Assigned to: {task.assignedTo.name} (
                      {task.assignedTo.email})
                    </p>
                  )}
                </div>
                <div className="space-x-2 mt-1">
                  <button
                    onClick={() =>
                      navigate(`/admin-dashboard/tasks/edit/${task._id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openAssignModal(task._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Assign
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Assign Modal */}
      <Transition appear show={isAssignModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeAssignModal}>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded shadow-xl w-96">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Assign Task
              </Dialog.Title>
              {assignError && (
                <p className="text-red-500 text-sm mb-2">{assignError}</p>
              )}

              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeAssignModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Assign
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
