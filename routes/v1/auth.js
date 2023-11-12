require('dotenv').config({ path: '.env.local' });
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

function newToken() {

  const payload = {
    user_id: 100500,
    user_role: 'editor'   // reader | editor | admin
  };

  const options = {
      expiresIn: '1d',
      subject: 'free_auth'
  };

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

router.get('/signup', (req, res) => {
  res.json({ token: newToken() });
});


router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "secret") {
      res.json({ token: newToken() });
  } else {
      res.status(401).json({ message: "Incorrect username or password" });
  }
});





// Passport test
router.get('/passport', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payload = req.user;
  res.json({ payload: payload });
});

module.exports = router;
