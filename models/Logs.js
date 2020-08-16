const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  product_name: {
    type: String,
    required: true
  },
  model_name: {
    type: String,
    required: true
  },
  seller_name: {
    type: String,
    required: true
  },
  material_type: {
    type: String,
    required: true
  },
  price_version: {
    type: Number,
    required: true
  },
  order_type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    default: 'Empty note'
  },
});

module.exports = Logs = mongoose.model('logs', LogsSchema);