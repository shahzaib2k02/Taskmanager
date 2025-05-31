const User = require("../models/User");
const TaskAssignment = require("../models/TaskAssingment");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        // Find assignments where userId matches
        const assignments = await TaskAssignment.find({
          userId: user._id,
        }).populate("taskId");

        // Extract tasks info from assignments
        const assignedTasks = assignments.map((assignment) => ({
          _id: assignment.taskId._id,
          title: assignment.taskTitle,
          description: assignment.taskId.description,
          status: assignment.taskId.status,
          // add more fields as needed
        }));

        return {
          ...user.toObject(),
          assignedTasks,
        };
      })
    );

    res.status(200).json(usersWithTasks);
  } catch (err) {
    console.error("Failed to fetch users with tasks:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
