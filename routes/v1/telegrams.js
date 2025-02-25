const passport = require('passport');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

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
router.post('/telegrams', 
  passport.authenticate('jwt', { session: false, failWithError: true }), 
  telegramValidatorsPOST, 
  validationErrorHandler, 
  (req, res) => {  

    const payload = req.user;

    let finalData = {};
    finalData.user_id = new ObjectId(payload.user_id);
    finalData = {...finalData, ...req.body};

    controller.insert(finalData)
    .then(data => res.status(201).json(data))
    .catch(error => console.error(error)); 
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
router.put('/telegrams/:id', 
  passport.authenticate('jwt', { session: false, failWithError: true }),
  telegramValidatorsPUT, 
  validationErrorHandler, 
  (req, res) => {
    controller.update(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Telegram not found');
      }
    })
    .catch(error => console.error(error)); 
});

////////////////////
////   PATCH    ////
////////////////////
router.patch('/telegrams/:id', 
  passport.authenticate('jwt', { session: false, failWithError: true }),
  telegramValidatorsPATCH, 
  validationErrorHandler, 
  (req, res) => {
    controller.update(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Telegram not found');
      }
    })
    .catch(error => console.error(error)); 
});

////////////////////
////   DELETE   ////
////////////////////
router.delete('/telegrams/:id', 
  passport.authenticate('jwt', { session: false, failWithError: true }),
  telegramValidatorsDELETE, 
  validationErrorHandler, 
  (req, res) => {
    controller.delete(req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Telegram not found');
      }
    })
    .catch(error => console.error(error)); 
});

module.exports = router;
