const express = require('express');
const app = express();

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
