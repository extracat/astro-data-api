const express = require('express');
const router = express.Router();
const apiVersion = '1.2.0';

// API version
router.get('/version', (req, res) => {
  res.json({ version: apiVersion });
});

// API test
router.get('/delayed-response/:timeout', (req, res) => {
  const timeout = parseInt(req.params.timeout);
  setTimeout(() => {
    res.json({ message: `This response is delayed for ${timeout} milliseconds!`});
  }, timeout);
});

module.exports = router;
