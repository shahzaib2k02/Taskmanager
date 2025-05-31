import { useState } from "react";
import api from "../../api/axios";
// Optional: import DatePicker from "react-datepicker"; // npm install react-datepicker
// import "react-datepicker/dist/react-datepicker.css";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/tasks", formData);
      setSuccess("✅ Task created successfully!");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "To Do",
      });
    } catch (err) {
      setError("⚠️ " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Create Task</h2>

      {error && (
        <div className="flex items-center text-red-600 bg-red-100 p-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center text-green-600 bg-green-100 p-2 rounded mb-2 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Optional description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          {/* Optional Date Picker: replace with below if using react-datepicker */}
          {/* <DatePicker
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={(date) => setFormData(prev => ({
              ...prev,
              dueDate: date.toISOString().split('T')[0],
            }))}
            className="w-full border p-2 rounded"
          /> */}
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!formData.title || !formData.dueDate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
