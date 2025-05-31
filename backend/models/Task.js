const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
