const express = require("express");
const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const {validateTeacher} = require("../validations/teacherValidation");

const router = express.Router();

router.post("/", validateTeacher, createTeacher);

router.get("/", getTeachers);

router.get("/:id", getTeacherById);

router.put("/:id", validateTeacher, updateTeacher);

router.delete("/:id", deleteTeacher);

module.exports = router;
