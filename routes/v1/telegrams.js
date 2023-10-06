const express = require('express');
const router = express.Router();

const { validationErrorHandler } = require('./telegramsValidation');
const { telegramValidatorsPOST,
        telegramValidatorsGET,
        telegramValidatorsPUT,
        telegramValidatorsPATCH,
        telegramValidatorsDELETE,                
      } = require('./telegramsValidation');

// Controllers
const controller = require('../../controllers/telegramsController')


////////////////////
////    POST    ////
////////////////////
router.post('/telegrams', telegramValidatorsPOST, validationErrorHandler, (req, res) => {

  const newTelegram = {
    id: Date.now().toString(),
    title: req.body.title,
    body: req.body.body,
    timestamp: new Date().toISOString(), 
  };
  
  telegrams.push(newTelegram);
  res.status(201).json(newTelegram);
});


////////////////////
////    GET     ////
////////////////////
router.get('/telegrams', (req, res) => {
  controller.find()
  .then(data => res.json(data))
  .catch(error => console.error(error)); 
});

router.get('/telegrams/:id', telegramValidatorsGET, validationErrorHandler,  (req, res) => {
  controller.findOne(req.params.id)
  .then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Telegram not found');
    }
  })
  .catch(error => console.error(error)); 
});

////////////////////
////    PUT     ////
////////////////////
router.put('/telegrams/:id', telegramValidatorsPUT, validationErrorHandler, (req, res) => {
  const index = telegrams.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    const updatedTelegram = { ...req.body };
    updatedTelegram.id = telegrams[index].id; // сохраняем оригинальный id
    updatedTelegram.timestamp = telegrams[index].timestamp; // сохраняем оригинальный timestamp
    telegrams[index] = updatedTelegram;
    res.json(telegrams[index]);
  } else {
    res.status(404).send('Telegram not found');
  }
});

////////////////////
////   PATCH    ////
////////////////////
router.patch('/telegrams/:id', telegramValidatorsPATCH, validationErrorHandler, (req, res) => {
  const index = telegrams.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    const updatedTelegram = { ...telegrams[index], ...req.body };
    updatedTelegram.id = telegrams[index].id; // сохраняем оригинальный id
    updatedTelegram.timestamp = telegrams[index].timestamp; // сохраняем оригинальный timestamp
    telegrams[index] = updatedTelegram;
    res.json(telegrams[index]);
  } else {
    res.status(404).send('Telegram not found');
  }
});

////////////////////
////   DELETE   ////
////////////////////
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
