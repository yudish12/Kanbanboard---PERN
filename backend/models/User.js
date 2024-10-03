const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../utils/db");

const User = sequelize.define("User", {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
});

User.sync();

module.exports = User;
