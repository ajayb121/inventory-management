const express = require('express');
const router = express.Router();

// Item Model
const TeerResults = require('../../models/TeerResults');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  TeerResults.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new TeerResults({
    firstLine: req.body.firstLine,
    secondLine: req.body.secondLine,
    thirdLine: req.body.thirdLine,
    fourthLine: req.body.fourthLine,
    fifthLine: req.body.fifthLine,
    date: req.body.date
  });
  newItem.save().then(item => res.json(item));
});

// @route   POST api/items
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  TeerResults.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }))
});

module.exports = router;