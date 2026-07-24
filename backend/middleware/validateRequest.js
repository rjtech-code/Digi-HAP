const { body, validationResult } = require('express-validator');

const validateProfile = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
  
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),
  
  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  
  body('declaration')
    .isBoolean()
    .equals('true')
    .withMessage('You must confirm the information'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateProfile };