const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const StudentSubject = sequelize.define(
  "studentSubject",
  {},
  {timestamps: false}
);

module.exports = StudentSubject;
