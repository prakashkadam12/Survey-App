// controllers/surveyController.js
const Survey = require('../models/Survey');

const surveyController = async (req, res) => {
    const { answers, status } = req.body;

    try {
      console.log('Received survey data:', req.body);

      const survey = new Survey({
        answers,
        status,
      });

      const newSurvey = await survey.save();
      console.log('Survey saved successfully:', newSurvey);
      res.status(201).json(newSurvey);
    } catch (error) {
      console.error('Error saving survey:', error);
      res.status(500).json({ message: 'Error saving survey.', error: error.message });
    }
  }

module.exports = {surveyController}
