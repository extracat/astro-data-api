const { check, param, body } = require('express-validator');
const { validationResult } = require('express-validator');

const allowedFields = [
  'external_id',
  'title',
  'body',
  'event_datetime',
  'band',
  'coordinates',
  'light_curve',
  'authors',
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
    .isObject().withMessage('Coordinates must be an object')
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),
  
  check('coordinates.ra').if(body('coordinates').exists())
    .exists().withMessage('Coordinate RA is required')
    .isObject().withMessage('Coordinate RA must be an object'),

  check('coordinates.ra.value').if(body('coordinates').exists())
    .exists().withMessage('Coordinate RA.value is required')
    .isString().withMessage('Coordinate RA.value must be a string'),

  check('coordinates.dec').if(body('coordinates').exists())
    .exists().withMessage('Coordinate DEC is required')
    .isObject().withMessage('Coordinate DEC must be an object'),

  check('coordinates.dec.value').if(body('coordinates').exists())
    .exists().withMessage('Coordinate DEC.value is required')
    .isString().withMessage('Coordinate DEC.value must be a string'),
  
  check('light_curve')
    .optional()
    .isArray().withMessage('Light curve must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('light_curve.*')
    .optional()
    .isObject().withMessage('Light curve measurment must be an object')
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),

  check('light_curve.*.datetime')
    .optional()
    .isISO8601().withMessage('Light curve measurment datetime must be a valid ISO 8601 date string'),

  check('authors')
    .optional()
    .isArray().withMessage('Authors must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('authors.*')
    .optional()
    .isObject().withMessage('Authors must be an object')
    .isLength({ min: 0, max: 10000 }).withMessage('Must be no longer than 10000 characters'),

  check('authors.*.email')
    .optional()
    .isEmail().withMessage('Must be an e-mail')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

  check('observatories')
    .optional()
    .isArray().withMessage('Observatories must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('observatories.*')
    .optional()
    .isObject().withMessage('Observatory must be an object')
    .isLength({ min: 0, max: 1000 }).withMessage('Must be no longer than 1000 characters'),

  check('categories')
    .optional()
    .isArray().withMessage('Categories must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('categories.*')
    .optional()
    .isString().withMessage('Categorie must be a string')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

  check('references')
    .optional()
    .isArray().withMessage('References must be an array')
    .isLength({ min: 0, max: 100 }).withMessage('Must be not more than 100 items'),

  check('references.*')
    .optional()
    .isString().withMessage('References must be a string')
    .isLength({ min: 0, max: 100 }).withMessage('Must be no longer than 100 characters'),

];

const telegramRequiredFields = [
  check('title')
    .not().isEmpty().withMessage('Title is required'),

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
    return res.status(400).json({ errors: `Invalid field(s): ${invalidFields.join(', ')}` });
  }

  // Return error id validation fails
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  next();
};

