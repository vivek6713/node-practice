const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const {validateStudent} = require("../validations/studentValidation");

const router = express.Router();

router.post("/", validateStudent, createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.put("/:id", validateStudent, updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;
