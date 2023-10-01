const express = require('express');
const app = express();

// Application-level middleware, routes, etc.

const apiV1Routes = require('./routes/api-v1');
const apiV2Routes = require('./routes/api-v2');

app.use('/api/v1', apiV1Routes);
app.use('/api/v2', apiV2Routes);

module.exports = app;
