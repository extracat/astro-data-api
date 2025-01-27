//
// This file is the main starting point for express application.
//

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('../passport/pasport');


///////// Swagger UI page /////////

const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const yamlFile = fs.readFileSync(path.join(__dirname,'../index.yaml'), 'utf8');
const swaggerDocument = yaml.load(yamlFile);

app.use(express.static(path.join(__dirname, '../public')))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

///////// End of swagger /////////




// List of domains which are allowed to work with API
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods
  credentials: false, // if don't need cookies
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));



///////// Application-level middleware /////////

// Logging of response time
if (process.env.CHRONOMETER === 'TRUE') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Chronometer: Request to ${req.path} took ${duration}ms`);
    });
    next();
  });
}

// Logging with morgan
if (process.env.MORGAN === 'TRUE') {
  app.use(morgan('dev'));
}

// Throttling (delay) for debug purposes
if (process.env.THROTTLING === 'TRUE') {
  const delayTime = Number(process.env.THROTTLING_DELAY) || 1000; 
  app.use((req, res, next) => {
    setTimeout(() => {
      next();
    }, delayTime);
  });
}

app.use(express.json());
app.use(passport.initialize());

///////// End of application-level middleware /////////



///////// Main application routes /////////

// V1 (Current version)
const apiV1Routes_api = require('../routes/v1/api');
const apiV1Routes_auth = require('../routes/v1/auth');
const apiV1Routes_telegrams = require('../routes/v1/telegrams');
const apiV1Routes_mockObjects = require('../routes/v1/mockObjects');

app.use('/api/v1', apiV1Routes_api);
app.use('/api/v1', apiV1Routes_auth);
app.use('/api/v1', apiV1Routes_telegrams);
app.use('/api/v1', apiV1Routes_mockObjects);

// V2 (to be in the future)
const apiV2Routes = require('../routes/v2/api');
app.use('/api/v2', apiV2Routes);

///////// End of main application routes /////////


// Passport.js 401 "Unauthorized" error handler
app.use((err, req, res, next) => {
  if (err) {
      // Auth error 401
      if (err.name === 'AuthenticationError' && err.status === 401) {
          return res.status(401).json(new ResponseError('error', 401, 'Unauthorized'));
      }
      // Other errors
      return res.status(500).json(new ResponseError('error', 500, 'Unexpected error')); 
  }
  next();
});


// Default 404 error handlers

const { ResponseError } = require('../models/responseError');

app.get('*', function(req, res){
  res.status(404).json(new ResponseError('error', 404, 'Not found')); 
})

// Default 500 error handlers
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(new ResponseError('error', 500, 'Unexpected error')); 
})

module.exports = app;
