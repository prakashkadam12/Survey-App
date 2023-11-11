// models/Survey.js
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  answers: {
    type: Object, 
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
