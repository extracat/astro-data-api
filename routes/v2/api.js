const express = require('express');
const router = express.Router();
const apiVersion = '2.0.0';

// API version
router.get('/version', (req, res) => {
  res.json({ version: apiVersion });
});


module.exports = router;
