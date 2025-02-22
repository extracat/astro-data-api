const { check, param, body } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = [
  'email',
  'password'
];

// Validation schemas

const userDataValidator = [
  check('email')
    .optional()
    .isEmail().withMessage('Must be valid e-mail')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),
  
    check('password')
    .optional()
    .isString().withMessage('Password must be a string')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

];

const userRequiredFields = [
  check('email')
    .not().isEmpty().withMessage('Email is required'),

  check('password')
    .not().isEmpty().withMessage('Password is required'),   
    
];

const userIdValidator = [
  param('id')
    .exists().withMessage('ID is required')
    .isString().withMessage('ID must be a string')
    .isLength({ min: 24, max: 24 }).withMessage('ID must be 24 characters')
];

exports.userValidatorsPOST = [
  ...userRequiredFields,
  ...userDataValidator
];

exports.userValidatorsGET = [
  ...userIdValidator
];

exports.userValidatorsPUT = [
  ...userIdValidator,
  ...userDataValidator
];

exports.userValidatorsPATCH = exports.userValidatorsPUT;
exports.userValidatorsDELETE = exports.userValidatorsGET; 






// Validation errors handler in all these routes
exports.validationErrorHandler = function validationErrorHandler(req, res, next) {

  // Check if all fields are allowed
  const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    return res.status(400).json({ 
      status: 'error',
      code: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}` 
    });
  }

  // Return error id validation fails
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      status: 'error',
      code: 400,
      errors: errors.array() 
    });
  }
  
  next();
};

