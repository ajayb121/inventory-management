const express = require('express');
const router = express.Router();

// Item Model
const Logs = require('../../models/Logs');

// sort Function
const sortFunction = (a, b) => {
  var o1 = a["date"];
  var o2 = b["date"];

  if (o1 < o2) return 1;
  if (o1 > o2) return -1;
  return 0;
}

// @route   GET api/logs
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Logs.find()
    .then(logs => res.json(logs.sort(sortFunction)))
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/logs
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newLog = new Logs({
    product_name: req.body.product_name,
    model_name: req.body.model_name,
    seller_name: req.body.seller_name,
    material_type: req.body.material_type,
    price_version: req.body.price_version,
    order_type: req.body.order_type,
    quantity: req.body.quantity,
    price: req.body.price,
    note: req.body.note || "Empty Note",
  });
  newLog.save()
    .then(() => {
      Logs.find().then(logs => res.json(logs.sort(sortFunction)));
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/logs
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Logs.findById(req.params.id)
    .then(log => log.remove().then(() => {
      Logs.find().then(logs => res.json(logs.sort(sortFunction)));
    }))
    .catch(() => res.status(404).json(err))
});

module.exports = router;