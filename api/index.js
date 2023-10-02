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

///////// End of middleware block /////////

// Main application routes
const apiV1Routes = require('../routes/api-v1');
const apiV2Routes = require('../routes/api-v2');

app.use('/api/v1', apiV1Routes);
app.use('/api/v2', apiV2Routes);

module.exports = app;
