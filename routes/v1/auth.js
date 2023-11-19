require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { validationErrorHandler } = require('./usersValidation');
const { userValidatorsPOST,
        userValidatorsGET,
        userValidatorsPUT,
        userValidatorsPATCH,
        userValidatorsDELETE,                
      } = require('./usersValidation');

// Controllers
const controller = require('../../controllers/usersController')

async function newToken(payload) {

  const options = {
      expiresIn: '1d',
      subject: 'login-password'
  };

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

async function registerUser(email, password) {
  const defaultRole = 'editor'; // reader | editor | admin

  const hashedPassword = await bcrypt.hash(password, 10); 
  const user = { email, password: hashedPassword, role: defaultRole };

  try {
    const result = await controller.insert(user);

    const payload = {
      user_id: result.insertedId,
      user_email: email,
      user_role: defaultRole   
    };
  
    const token = await newToken(payload);
    return { token };

  } catch (error) {
      throw error;
  }
}

async function authenticateUser(email, password) {
  const user = await controller.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Authentication failed');
  }

  const payload = {
    user_id: user._id,
    user_email: user.email,
    user_role: user.role
  };

  const token = await newToken(payload);

  return { token };

}

router.post('/signup', userValidatorsPOST, validationErrorHandler, (req, res) => {  
  registerUser(req.body.email, req.body.password)
  .then(token => res.status(201).json(token))
  .catch(error => {
    // E11000 duplicate key error
    if (error.code === 11000) {
      // this email already exists
      res.status(409).send('Email already in use');
    } else {
      res.status(500).send('Error registering user');
    }
  }); 
});



router.post('/auth', userValidatorsPOST, validationErrorHandler, (req, res) => {  
  authenticateUser(req.body.email, req.body.password)
  .then(token => res.json(token))
  .catch(error => res.status(401).send(error.message)); 
});



// Passport test
router.get('/passport', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payload = req.user;
  res.json({ payload: payload });
});


module.exports = router;
