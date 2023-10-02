const express = require('express');
const router = express.Router();

// API version
router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

// API test
router.get('/delayed-response/:timeout', (req, res) => {
  const timeout = parseInt(req.params.timeout);
  setTimeout(() => {
    res.json({ message: `This response is delayed for ${timeout} milliseconds!`});
  }, timeout);
});


// Sample data
const planets = [
  { id: 1, name: 'Mercury', diameter: 4879 },
  { id: 2, name: 'Venus', diameter: 12104 },
  { id: 3, name: 'Earth', diameter: 12742 },
  // ...add more planets as needed
];

// Route to get all planets
router.get('/planets', (req, res) => {
  res.json(planets);
});

// Route to get a specific planet by ID
router.get('/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ error: 'Planet not found' });
  }
});

module.exports = router;
