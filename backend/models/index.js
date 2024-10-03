const User = require("./User");
const Task = require("./Task");

// Define associations
User.hasMany(Task, { foreignKey: "user_id" }); // A user can have many tasks
Task.belongsTo(User, { foreignKey: "user_id" }); // A task belongs to a user

module.exports = {
  User,
  Task,
};
