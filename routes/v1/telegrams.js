const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { validationErrorHandler } = require('./telegrams-validation');
const { telegramValidatorsPOST,
        telegramValidatorsGET,
        telegramValidatorsPUT,
        telegramValidatorsPATCH,
        telegramValidatorsDELETE,                
      } = require('./telegrams-validation');


let telegrams = []; 


router.get('/telegrams', (req, res) => {
  res.json(telegrams);
});

router.get('/telegrams/:id', telegramValidatorsGET, validationErrorHandler,  (req, res) => {
  const telegram = telegrams.find(t => t.id === req.params.id);
  if (telegram) {
    res.json(telegram);
  } else {
    res.status(404).send('Telegram not found');
  }
});

router.post('/telegrams', telegramValidatorsPOST, validationErrorHandler, (req, res) => {
  const newTelegram = { id: Date.now().toString(), ...req.body };
  telegrams.push(newTelegram);
  res.status(201).json(newTelegram);
});

router.put('/telegrams/:id', telegramValidatorsPUT, validationErrorHandler, (req, res) => {
  const index = telegrams.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    telegrams[index] = { id: req.params.id, ...req.body };
    res.json(telegrams[index]);
  } else {
    res.status(404).send('Telegram not found');
  }
});

router.patch('/telegrams/:id', telegramValidatorsPATCH, validationErrorHandler, (req, res) => {
  const index = telegrams.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    telegrams[index] = { ...telegrams[index], ...req.body };
    res.json(telegrams[index]);
  } else {
    res.status(404).send('Telegram not found');
  }
});

router.delete('/telegrams/:id', telegramValidatorsDELETE, validationErrorHandler, (req, res) => {
  const index = telegrams.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    telegrams.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Telegram not found');
  }
});

module.exports = router;
