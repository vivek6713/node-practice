const {Subject} = require("../models");

// Create a new subject
exports.createSubject = async (req, res, next) => {
  try {
    const {name} = req.body;
    const subject = await Subject.create({name});
    return res.status(201).json({success: true, data: subject});
  } catch (error) {
    next(error);
  }
};

// Get all subjects
exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.findAll();
    return res.status(200).json({success: true, data: subjects});
  } catch (error) {
    next(error);
  }
};

// Get a single subject by ID
exports.getSubjectById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res
        .status(404)
        .json({success: false, message: "Subject not found"});
    }
    return res.status(200).json({success: true, data: subject});
  } catch (error) {
    next(error);
  }
};

// Update a subject
exports.updateSubject = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res
        .status(404)
        .json({success: false, message: "Subject not found"});
    }

    subject.name = name;
    await subject.save();
    return res.status(200).json({success: true, data: subject});
  } catch (error) {
    next(error);
  }
};

// Delete a subject
exports.deleteSubject = async (req, res, next) => {
  try {
    const {id} = req.params;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res
        .status(404)
        .json({success: false, message: "Subject not found"});
    }

    await subject.destroy();
    return res
      .status(200)
      .json({success: true, message: "Subject deleted successfully"});
  } catch (error) {
    next(error);
  }
};
