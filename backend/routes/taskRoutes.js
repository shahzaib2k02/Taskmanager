const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/stats", taskController.getTaskStats);
router.get("/:id", taskController.getTaskById);
router.put("/:id/assign", taskController.assignTask);
router.get("/user-tasks/:userId", taskController.getTasksForUser);
router.post("/:id/complete", taskController.markTaskComplete);

module.exports = router;
