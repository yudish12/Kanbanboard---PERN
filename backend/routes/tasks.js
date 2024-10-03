const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} = require("../controllers/task");

const router = express.Router();

router
  .route("/")
  .get(getTasks)
  .post(createTask)
  .patch(updateTask)
  .delete(deleteTask);

router.patch("/reorder", reorderTasks);

module.exports = router;
