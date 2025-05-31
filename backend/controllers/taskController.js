const Task = require("../models/Task");
const User = require("../models/User");
const TaskAssignment = require("../models/TaskAssingment");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Paginated Task List
exports.getAllTasks = async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Task.countDocuments();

    res.json({
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Task Stats
exports.getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const toDo = await Task.countDocuments({ status: "To Do" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const completed = await Task.countDocuments({ status: "Completed" });

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);

    res.json({
      totalTasks,
      toDo,
      inProgress,
      completed,
      completionRate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign Task to User
exports.assignTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required to assign task" });
    }

    const task = await Task.findById(taskId);
    const user = await User.findById(userId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assign the task
    task.assignedTo = userId;

    // 🔁 Update the status if it's "To Do"
    if (task.status === "To Do") {
      task.status = "In Progress";
    }

    await task.save();

    // Log the assignment
    await TaskAssignment.create({
      taskId,
      taskTitle: task.title,
      userId,
      userName: user.name,
    });

    res.status(200).json({ message: "Task successfully assigned", task });
  } catch (err) {
    console.error("Error assigning task:", err.message);
    res.status(500).json({ error: "Server error while assigning task" });
  }
};

exports.getTasksForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Changed from req.query to req.params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Step 2: Find all assignments for this user using the TaskAssignment model
    const assignments = await TaskAssignment.find({ userId });

    // Step 3: Extract all taskIds from these assignments
    const taskIds = assignments.map((assignment) => assignment.taskId);

    // Step 4: Fetch the actual Task details using the extracted taskIds
    const tasks = await Task.find({ _id: { $in: taskIds } });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks for user" });
  }
};

exports.markTaskComplete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the task is assigned to the user (via TaskAssignment)
    const assignment = await TaskAssignment.findOne({ taskId, userId });

    if (!assignment) {
      return res
        .status(403)
        .json({ message: "This task is not assigned to the specified user" });
    }

    // Update task status
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "Completed";
    await task.save();

    res.status(200).json({ message: "Task marked as completed", task });
  } catch (err) {
    console.error("Error marking task complete:", err.message);
    res.status(500).json({ message: "Failed to complete task" });
  }
};
