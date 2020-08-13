const express = require('express');
const router = express.Router();

// Item Model
const KhanaparaResults = require('../../models/KhanaparaResults');
const JowaiResults = require('../../models/JowaiResults');
const ShillongResults = require('../../models/ShillongResults');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  const results = {};
  KhanaparaResults.find()
    .sort({ date: -1 })
    .then(items => {
      results.khanaparaResults = items;
      JowaiResults.find()
        .sort({ date: -1 })
        .then(items => {
          results.jowaiResults = items;
          ShillongResults.find()
            .sort({ date: -1 })
            .then(items => {
              results.shillongResults = items;
              res.json(results);
            });
        });
    })
    .catch(() => res.status(404).json({ }));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/khanaparaResults', (req, res) => {
  const newItem = new KhanaparaResults({
    firstRound: req.body.firstRound,
    secondRound: req.body.secondRound,
    date: req.body.date
  });
  newItem.save().then(item => res.json(item));
});

router.post('/jowaiResults', (req, res) => {
  const newItem = new JowaiResults({
    firstRound: req.body.firstRound,
    secondRound: req.body.secondRound,
    date: req.body.date
  });
  newItem.save().then(item => res.json(item));
});

router.post('/shillongResults', (req, res) => {
  const newItem = new ShillongResults({
    firstRound: req.body.firstRound,
    secondRound: req.body.secondRound,
    date: req.body.date
  });
  newItem.save().then(item => res.json(item));
});

// // @route   POST api/items
// // @desc    Delete An Item
// // @access  Public
router.delete('/:id', (req, res) => {
  KhanaparaResults.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }))
});

module.exports = router;