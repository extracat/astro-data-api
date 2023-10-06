const { check, param } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = ['title', 'body'];

// Validation schemas

const telegramDataValidator = [
  check('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 0, max: 1000 }).withMessage('Title must be no longer than 1000 characters'),

  check('body')
    .optional()
    .isString().withMessage('Body must be a string')
    .isLength({ min: 0, max: 100000 }).withMessage('Body must be no longer than 100000 characters'),

  check('timestamp')
    .optional()
    .isISO8601().withMessage('Timestamp must be a valid ISO 8601 date string'),

  // ...другие правила валидации для других полей...
];

const telegramRequiredFields = [
  check('title')
    .not().isEmpty().withMessage('Title is required'),

  check('body')
    .not().isEmpty().withMessage('Body is required'),    
];

const telegramIdValidator = [
  param('id')
    .exists().withMessage('ID is required')
    .isString().withMessage('ID must be a string')
    .isLength({ min: 0, max: 24 }).withMessage('ID must be no longer than 24 characters')
];

exports.telegramValidatorsPOST = [
  ...telegramRequiredFields,
  ...telegramDataValidator
];

exports.telegramValidatorsGET = [
  ...telegramIdValidator
];

exports.telegramValidatorsPUT = [
  ...telegramIdValidator,
  ...telegramRequiredFields,
  ...telegramDataValidator
];

exports.telegramValidatorsPATCH = [
  ...telegramIdValidator,
  ...telegramDataValidator
];

exports.telegramValidatorsDELETE = exports.telegramValidatorsGET; 




// Validation errors handler in all these routes
exports.validationErrorHandler = function validationErrorHandler(req, res, next) {

  // Check if all fields are allowed
  const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    return res.status(400).json({ errors: `Invalid field(s): ${invalidFields.join(', ')}` });
  }

  // Return error id validation fails
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  next();
};



