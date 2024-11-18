const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Subject = sequelize.define("subject", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Subject;
