require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mast-next.vercel.app',
    'https://mast-next-git-develop-extracat.vercel.app'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods
  credentials: false, // if don't need cookies
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

///////// Application-level middleware /////////

// Logging of response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`Chronometer: Request to ${req.path} took ${duration}ms`);
  });
  next();
});

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

///////// End of middleware block /////////

// Main application routes
// V1 (Current version)
const apiV1Routes_api = require('../routes/v1/api');
const apiV1Routes_telegrams = require('../routes/v1/telegrams');

app.use('/api/v1', apiV1Routes_api);
app.use('/api/v1', apiV1Routes_telegrams);

// V2 (to be in the future)
const apiV2Routes = require('../routes/v2/api');
app.use('/api/v2', apiV2Routes);

module.exports = app;
