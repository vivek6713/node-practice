const express = require("express");
const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const {validateSubject} = require("../validations/subjectValidation");

const router = express.Router();

router.post("/", validateSubject, createSubject);

router.get("/", getSubjects);

router.get("/:id", getSubjectById);

router.put("/:id", validateSubject, updateSubject);

router.delete("/:id", deleteSubject);

module.exports = router;
