const sequelize = require("../config/db");
const Subject = require("./subject");
const Student = require("./student");
const Teacher = require("./teacher");
const StudentSubject = require("./studentSubject");
const TeacherSubject = require("./teacherSubject");

// Relationships
Student.belongsToMany(Subject, {through: StudentSubject});
Subject.belongsToMany(Student, {through: StudentSubject});

Teacher.belongsToMany(Subject, {through: TeacherSubject});
Subject.belongsToMany(Teacher, {through: TeacherSubject});

module.exports = {
  sequelize,
  Subject,
  Student,
  Teacher,
  StudentSubject,
  TeacherSubject,
};
