const {Student, Subject} = require("../models");

// Create a new student
exports.createStudent = async (req, res, next) => {
  try {
    const {name, email, phone, subjectIds} = req.body;

    // Create student
    const student = await Student.create({name, email, phone});

    // Associate subjects if provided
    if (subjectIds && Array.isArray(subjectIds)) {
      await student.setSubjects(subjectIds);
    }

    return res.status(201).json({success: true, data: student});
  } catch (error) {
    next(error);
  }
};

// Get all students with their subjects
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: {
        model: Subject,
        through: {attributes: []}, // Exclude join table data
      },
    });
    return res.status(200).json({success: true, data: students});
  } catch (error) {
    next(error);
  }
};

// Get a single student by ID with their subjects
exports.getStudentById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const student = await Student.findByPk(id, {
      include: {
        model: Subject,
        through: {attributes: []},
      },
    });

    if (!student) {
      return res
        .status(404)
        .json({success: false, message: "Student not found"});
    }

    return res.status(200).json({success: true, data: student});
  } catch (error) {
    next(error);
  }
};

// Update a student and their subjects
exports.updateStudent = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, email, phone, subjectIds} = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(404)
        .json({success: false, message: "Student not found"});
    }

    // Update student data
    student.name = name;
    student.email = email;
    student.phone = phone;
    await student.save();

    // Update subjects if provided
    if (subjectIds && Array.isArray(subjectIds)) {
      await student.setSubjects(subjectIds);
    }

    return res.status(200).json({success: true, data: student});
  } catch (error) {
    next(error);
  }
};

// Delete a student and their associations
exports.deleteStudent = async (req, res, next) => {
  try {
    const {id} = req.params;

    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(404)
        .json({success: false, message: "Student not found"});
    }

    // Delete student
    await student.destroy();
    return res
      .status(200)
      .json({success: true, message: "Student deleted successfully"});
  } catch (error) {
    next(error);
  }
};
