const { check, param, body } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = [
  'name',
  'band'  
];

// Validation schemas

const mockObjectsDataValidator = [
  check('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({ min: 1, max: 20 }).withMessage('Name must be from 1 to 20 characters')

];

const mockObjectsRequiredFields = [
  check('name')
    .not().isEmpty().withMessage('Name is required')

];

const mockObjectsIdValidator = [
  param('id')
    .exists().withMessage('ID is required')
    .isString().withMessage('ID must be a string')
    .isLength({ min: 24, max: 24 }).withMessage('ID must 24 characters')
];

exports.mockObjectsValidatorsPOST = [
  ...mockObjectsRequiredFields,
  ...mockObjectsDataValidator
];

exports.mockObjectsValidatorsGET = [
  ...mockObjectsIdValidator
];

exports.mockObjectsValidatorsPUT = [
  ...mockObjectsRequiredFields,
  ...mockObjectsIdValidator,
  ...mockObjectsDataValidator
];

exports.mockObjectsValidatorsPATCH = exports.mockObjectsValidatorsPUT;
exports.mockObjectsValidatorsDELETE = exports.mockObjectsValidatorsGET; 






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

