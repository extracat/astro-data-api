const express = require('express');
const router = express.Router();

// API version
router.get('/version', (req, res) => {
  res.json({ version: '2.0.0' });
});

module.exports = router;
