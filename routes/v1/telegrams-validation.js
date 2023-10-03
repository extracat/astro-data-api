const { check, param } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = ['title', 'body', 'timestamp'];

// Validation schemas

const telegramDataValidator = [
  check('message')
    .optional()
    .isString().withMessage('Message must be a string')
    .isLength({ min: 0, max: 100000 }).withMessage('Message must be no longer than 100000 characters'),

  check('timestamp')
    .optional()
    .isISO8601().withMessage('Timestamp must be a valid ISO 8601 date string'),

  // ...другие правила валидации для других полей...
];

const telegramRequiredFields = [
  check('message')
    .not().isEmpty().withMessage('Message is required'),

  check('timestamp')
    .not().isEmpty().withMessage('Timestamp is required'),

];

const telegramIdValidator = [
  param('id')
    .exists().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isLength({ min: 0, max: 20 }).withMessage('ID must be no longer than 20 characters')
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

  // Return error id validation fails
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if all fields are allowed
  const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    return res.status(400).json({ errors: `Invalid field(s): ${invalidFields.join(', ')}` });
  }

  next();
};



