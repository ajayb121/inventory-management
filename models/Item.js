const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  product_name: {
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
  total_quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    required: true
  },
});

module.exports = Item = mongoose.model('items', ItemSchema);