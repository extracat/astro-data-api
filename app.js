const express = require('express');
const app = express();

// Application-level middleware, routes, etc.

// Sample data
const planets = [
  { id: 1, name: 'Mercury', diameter: 4879 },
  { id: 2, name: 'Venus', diameter: 12104 },
  { id: 3, name: 'Earth', diameter: 12742 },
  // ...add more planets as needed
];

// Route to get all planets
app.get('/planets', (req, res) => {
  res.json(planets);
});

// Route to get a specific planet by ID
app.get('/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ error: 'Planet not found' });
  }
});




module.exports = app;
