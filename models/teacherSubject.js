const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const TeacherSubject = sequelize.define(
  "teacherSubject",
  {},
  {timestamps: false}
);

module.exports = TeacherSubject;
