const Task = require("../models/Task");
const { catchAsync } = require("../utils");
const { Op } = require("sequelize");
const sequelize = require("../utils/db");
const AppError = require("../utils/appError");

const getTasks = catchAsync(async (req, res, next) => {
  const { user } = req;
  const tasks = await Task.findAll({
    where: { user_id: user.id },
    order: [["order", "ASC"]],
  });
  return res.status(200).json({ data: tasks, success: true });
});

const createTask = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { title, description, status } = req.body;

  // Check if required fields are provided
  if (!title || !description || !status) {
    const err = new AppError("Missing required fields", 400, "MISSING_FIELDS");
    return next(err);
  }

  // Find the current highest order in the given status (column) for the user
  const maxOrder = await Task.max("order", {
    where: { status, user_id: user.id },
  });

  // Create a new task with the highest order + 1
  const task = await Task.create({
    title,
    description,
    status,
    order: maxOrder ? maxOrder + 1 : 1, // If no tasks exist, set order to 1
    user_id: user.id,
  });

  return res.status(200).json({ data: task, success: true });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);
  if (!id) {
    const err = new AppError("Missing task id", 400, "MISSING_FIELDS");
    return next(err);
  }
  const task = await Task.update(
    { ...req.body, updated_at: new Date() },
    { where: { id } }
  );
  return res.status(200).json({ data: task, success: true });
});

const reorderTasks = catchAsync(async (req, res, next) => {
  const { taskId, newStatus, newOrder } = req.body;
  const task = await Task.findByPk(taskId);

  if (!task) {
    return next(new AppError("Task not found", 404, "TASK_NOT_FOUND"));
  }

  const oldStatus = task.status;
  const oldOrder = task.order;

  // If the task is moved within the same column
  if (oldStatus === newStatus) {
    if (newOrder > oldOrder) {
      // Task moved down, decrement the order of tasks between old and new positions
      await Task.update(
        { order: sequelize.literal('"order" - 1') },
        {
          where: {
            status: oldStatus,
            order: { [Op.between]: [oldOrder + 1, newOrder] },
          },
        }
      );
    } else if (newOrder < oldOrder) {
      // Task moved up, increment the order of tasks between new and old positions
      await Task.update(
        { order: sequelize.literal('"order" + 1') },
        {
          where: {
            status: oldStatus,
            order: { [Op.between]: [newOrder, oldOrder - 1] },
          },
        }
      );
    }
  } else {
    // Task is moved to a different column

    // Decrease order of tasks in the source column (old status)
    await Task.update(
      { order: sequelize.literal('"order" - 1') },
      {
        where: {
          status: oldStatus,
          order: { [Op.gt]: oldOrder },
        },
      }
    );

    // Increase order of tasks in the destination column (new status)
    await Task.update(
      { order: sequelize.literal('"order" + 1') },
      {
        where: {
          status: newStatus,
          order: { [Op.gte]: newOrder },
        },
      }
    );
  }

  // Finally, update the task's status and order
  task.status = newStatus;
  task.order = newOrder;
  await task.save();

  res.status(200).json({ data: task, success: true });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    const err = new AppError("Missing task id", 400, "MISSING_FIELDS");
    return next(err);
  }
  await Task.destroy({ where: { id } });
  return res.status(200).json({ success: true });
});

module.exports = { getTasks, createTask, deleteTask, reorderTasks, updateTask };
