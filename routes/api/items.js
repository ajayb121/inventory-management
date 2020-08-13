const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    company_name: req.body.companyName,
    item_name: req.body.itemName,
    total_count: req.body.totalCount,
  });
  newItem.save().then(item => res.json(item));
});

// @route   POST api/items/updateCount
// @desc    Update count of an Item
// @access  Public
router.post('/updateCount', (req, res) => {
  const { count, companyName, itemName } = req.body;
  Item.find({
    company_name: companyName,
    item_name: itemName
  })
    .then(item => {
      console.log("item", item);
      const totalCount = item[0].total_count + count;
      Item.updateOne({ _id: item[0]._id }, { $set: { total_count: totalCount } })
        .then(() => res.json({ total_count: totalCount }))
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/items
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }))
});

module.exports = router;