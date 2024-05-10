const passport = require('passport');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const { validationErrorHandler } = require('./mockObjectsValidation');
const { mockObjectsValidatorsPOST,
        mockObjectsValidatorsGET,
        mockObjectsValidatorsPUT,
        mockObjectsValidatorsPATCH,
        mockObjectsValidatorsDELETE,                
      } = require('./mockObjectsValidation');

// Controllers
const controller = require('../../controllers/mockObjectsController')


////////////////////
////    POST    ////
////////////////////
router.post('/mock-objects', 
  passport.authenticate('jwt', { session: false }), 
  mockObjectsValidatorsPOST, 
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
router.get('/mock-objects', (req, res) => {
  controller.find()
  .then(data => res.json(data))
  .catch(error => console.error(error)); 
});

router.get('/mock-objects/:id', mockObjectsValidatorsGET, validationErrorHandler,  (req, res) => {
  controller.findOne(req.params.id)
  .then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Object not found');
    }
  })
  .catch(error => console.error(error)); 
});




////////////////////
////    PUT     ////
////////////////////
router.put('/mock-objects/:id', 
  passport.authenticate('jwt', { session: false }),
  mockObjectsValidatorsPUT, 
  validationErrorHandler, 
  (req, res) => {
    controller.update(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Object not found');
      }
    })
    .catch(error => console.error(error)); 
});

////////////////////
////   PATCH    ////
////////////////////
router.patch('/mock-objects/:id', 
  passport.authenticate('jwt', { session: false }),
  mockObjectsValidatorsPATCH, 
  validationErrorHandler, 
  (req, res) => {
    controller.update(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Object not found');
      }
    })
    .catch(error => console.error(error)); 
});

////////////////////
////   DELETE   ////
////////////////////
router.delete('/mock-objects/:id', 
  passport.authenticate('jwt', { session: false }),
  mockObjectsValidatorsDELETE, 
  validationErrorHandler, 
  (req, res) => {
    controller.delete(req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('Object not found');
      }
    })
    .catch(error => console.error(error)); 
});


module.exports = router;
