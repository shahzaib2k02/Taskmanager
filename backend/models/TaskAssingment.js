const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TaskAssignment", taskAssignmentSchema);
