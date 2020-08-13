const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  company_name: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  total_count: {
    type: Number,
    required: true
  },
});

module.exports = Item = mongoose.model('items', ItemSchema);