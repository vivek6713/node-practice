const {Teacher, Subject} = require("../models");

// Create a new teacher
exports.createTeacher = async (req, res, next) => {
  try {
    const {name, phone, subjectIds} = req.body;

    // Create teacher
    const teacher = await Teacher.create({name, phone});

    // Associate subjects if provided
    if (subjectIds && Array.isArray(subjectIds)) {
      await teacher.setSubjects(subjectIds);
    }

    return res.status(201).json({success: true, data: teacher});
  } catch (error) {
    next(error);
  }
};

// Get all teachers with their subjects
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: Subject,
        through: {attributes: []}, // Exclude join table data
      },
    });
    return res.status(200).json({success: true, data: teachers});
  } catch (error) {
    next(error);
  }
};

// Get a single teacher by ID with their subjects
exports.getTeacherById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const teacher = await Teacher.findByPk(id, {
      include: {
        model: Subject,
        through: {attributes: []},
      },
    });

    if (!teacher) {
      return res
        .status(404)
        .json({success: false, message: "Teacher not found"});
    }

    return res.status(200).json({success: true, data: teacher});
  } catch (error) {
    next(error);
  }
};

// Update a teacher and their subjects
exports.updateTeacher = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, phone, subjectIds} = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res
        .status(404)
        .json({success: false, message: "Teacher not found"});
    }

    // Update teacher data
    teacher.name = name;
    teacher.phone = phone;
    await teacher.save();

    // Update subjects if provided
    if (subjectIds && Array.isArray(subjectIds)) {
      await teacher.setSubjects(subjectIds);
    }

    return res.status(200).json({success: true, data: teacher});
  } catch (error) {
    next(error);
  }
};

// Delete a teacher and their associations
exports.deleteTeacher = async (req, res, next) => {
  try {
    const {id} = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res
        .status(404)
        .json({success: false, message: "Teacher not found"});
    }

    // Delete teacher
    await teacher.destroy();
    return res
      .status(200)
      .json({success: true, message: "Teacher deleted successfully"});
  } catch (error) {
    next(error);
  }
};
