const {body, validationResult} = require("express-validator");

exports.validateSubject = [
  body("name").trim().notEmpty().withMessage("Name is required."),
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
