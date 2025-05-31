import { useEffect, useState } from "react";
import api from "../../api/axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#FACC15", "#10B981"];

export default function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/tasks/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Use the stats object from backend response
        setStats({
          total: res.data.totalTasks,
          todo: res.data.toDo,
          inProgress: res.data.inProgress,
          completed: res.data.completed,
        });
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };

    fetchStats();
  }, []);

  const percentComplete = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const pieData = [
    { name: "To Do", value: stats.todo },
    { name: "In Progress", value: stats.inProgress },
    { name: "Completed", value: stats.completed },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="To Do" value={stats.todo} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Task Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-green-500 h-6 rounded-full text-white text-sm flex items-center justify-center"
              style={{ width: `${percentComplete}%` }}
            >
              {percentComplete}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-semibold text-blue-700">{value}</p>
    </div>
  );
}
