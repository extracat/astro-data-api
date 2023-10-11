const { check, param } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = [
  'title',
  'body',
  'coordinates',
  'event_datetime',
  'magnitude',
  'limiting_magnitude',
  'filter',
  'reporters',
  'observatories',
  'categories',
  'references'  
];

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

  check('event_datetime')
    .optional()
    .isISO8601().withMessage('Timestamp must be a valid ISO 8601 date string'),

  check('coordinates')
    .optional()
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),
  
  check('magnitude')
    .optional()
    .isFloat().withMessage('Body must be a float number')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 10 characters'),

  check('limiting_magnitude')
    .optional()
    .isFloat().withMessage('Body must be a float number')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 10 characters'),

  check('filter')
    .optional()
    .isString().withMessage('Filter must be a string')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

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
  ...telegramDataValidator
];

exports.telegramValidatorsPATCH = exports.telegramValidatorsPUT;
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



