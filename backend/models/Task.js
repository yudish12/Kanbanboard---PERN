const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const { task_statuses } = require("../config");
const User = require("./User"); // Import User model

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        task_statuses.done,
        task_statuses.in_progress,
        task_statuses.todo
      ),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Name of the table being referenced
        key: "id", // Primary key of the referenced table
      },
      onDelete: "CASCADE", // If a user is deleted, their tasks will also be deleted
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["order"], // Index on the 'order' field
      },
    ],
  }
);

// Define associations
User.hasMany(Task, { foreignKey: "user_id" }); // A user can have many tasks
Task.belongsTo(User, { foreignKey: "user_id" }); // A task belongs to a user

// Sync the model to the database
Task.sync({ alter: true });

module.exports = Task;
