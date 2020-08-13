const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TeerResultsSchema = new Schema({
  date: {
    day: Number,
    month: Number,
    year: Number,
  },
  firstLine: {
    type: String,
    required: true
  },
  secondLine: {
    type: String,
    required: true
  },
  thirdLine: {
    type: String,
    required: true
  },
  fourthLine: {
    type: String,
    required: true
  },
  fifthLine: {
    type: String,
    required: true
  },
});

module.exports =  TeerResults = mongoose.model('teerResults', TeerResultsSchema);