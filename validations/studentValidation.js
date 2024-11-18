const {body, validationResult} = require("express-validator");

exports.validateStudent = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({min: 10})
    .withMessage("Phone number should be at least 10 digits long."),

  body("subjectIds")
    .optional()
    .isArray()
    .withMessage("Subject IDs should be an array of subject IDs.")
    .custom((value) => {
      if (value && value.length > 0) {
        return true;
      }
      return false;
    })
    .withMessage("At least one subject should be selected."),

  // Check for validation errors and return them
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({errors: errors.array().map((err) => err.msg)});
    }
    next();
  },
];
