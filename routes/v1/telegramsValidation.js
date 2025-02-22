const { check, param, body } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = [
  'event_datetime',
  'title',
  'authors',
  'authors_list',
  'body',
  'light_curve',
  'upper_limits',
  'band',
  'categories',
  'references'
];

// Validation schemas

const telegramDataValidator = [
  check('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 0, max: 200 }).withMessage('Title must be no longer than 200 characters'),

  check('body')
    .optional()
    .isString().withMessage('Body must be a string')
    .isLength({ min: 0, max: 100000 }).withMessage('Body must be no longer than 100000 characters'),

  check('authors')
    .optional()
    .isString().withMessage('Authors must be a string')
    .isLength({ min: 0, max: 10000 }).withMessage('Authors must be no longer than 10000 characters'),

  check('authors_list')
    .optional()
    .isArray().withMessage('Authors list must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('authors_list.*')
    .optional()
    .isObject().withMessage('Author in authors list must be an object')
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),

  check('event_datetime')
    .optional()
    .isISO8601().withMessage('Timestamp must be a valid ISO 8601 date string'),
  
  check('light_curve')
    .optional()
    .isArray().withMessage('Light curve must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('light_curve.*')
    .optional()
    .isObject().withMessage('Light curve measurment must be an object')
    .isLength({ min: 0, max: 10000 }).withMessage('Must be no longer than 10000 characters'),

  check('light_curve.*.coordinates').if(body('light_curve.*').exists())
    .exists().withMessage('Coordinates are required')
    .isObject().withMessage('Coordinates must be an object')
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),
  
  check('light_curve.*.coordinates.right_ascension').if(body('light_curve.*.coordinates').exists())
    .exists().withMessage('Coordinate RA is required')
    .isDecimal().withMessage('Coordinate RA must be decimal (degrees)'),

  check('light_curve.*.coordinates.declination').if(body('light_curve.*.coordinates').exists())
    .exists().withMessage('Coordinate DEC is required')
    .isDecimal().withMessage('Coordinate DEC must be decimal (degrees)'),

  check('light_curve.*.coordinates.error').if(body('light_curve.*.coordinates').exists())
    .exists().withMessage('Coordinate error is required')
    .isDecimal().withMessage('Coordinate error must be decimal (degrees)'),

  check('light_curve.*.datetime')
    .exists().withMessage('Datetime in light curve is required')
    .isISO8601().withMessage('Light curve measurment datetime must be a valid ISO 8601 date string'),


  check('categories')
    .optional()
    .isArray().withMessage('Categories must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('categories.*')
    .optional()
    .isObject().withMessage('Category must be an object')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

  check('references')
    .optional()
    .isArray().withMessage('References must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('references.*')
    .optional()
    .isString().withMessage('Reference must be a string')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

];

const telegramRequiredFields = [
  check('title')
    .not().isEmpty().withMessage('Title is required'),

  check('authors')
    .not().isEmpty().withMessage('Authors are required'), 

  check('body')
    .not().isEmpty().withMessage('Body is required'),   
    
  check('band')
    .not().isEmpty().withMessage('Band is required'),
];

const telegramIdValidator = [
  param('id')
    .exists().withMessage('ID is required')
    .isString().withMessage('ID must be a string')
    .isLength({ min: 9, max: 24 }).withMessage('ID must be 9 to 24 characters')
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

