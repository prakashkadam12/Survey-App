// routes/surveyRoutes.js
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// Save a survey
router.post('/', surveyController.surveyController);

module.exports = router;
