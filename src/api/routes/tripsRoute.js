const express = require('express');
const router = express.Router();
const TripController = require('../controllers/tripController');

router.get('/', TripController.createNewTrip);

module.exports = router;
