const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// sort Function
const sortFunction = (a, b) => {

  var o1 = a["product_name"].toLowerCase();
  var o2 = b["product_name"].toLowerCase();

  var m1 = a["model_name"].split(' ').join('').split('/').join('').toLowerCase();
  var m2 = b["model_name"].split(' ').join('').split('/').join('').toLowerCase();

  var p1 = a["seller_name"].toLowerCase();
  var p2 = b["seller_name"].toLowerCase();

  var q1 = a["material_type"].toLowerCase();
  var q2 = b["material_type"].toLowerCase();

  var r1 = a["price_version"];
  var r2 = b["price_version"];

  if (o1 < o2) return -1;
  if (o1 > o2) return 1;
  if (m1 < m2) return -1;
  if (m1 > m2) return 1;
  if (p1 < p2) return -1;
  if (p1 > p2) return 1;
  if (q1 < q2) return -1;
  if (q1 > q2) return 1;
  if (r1 < r2) return -1;
  if (r1 > r2) return 1;
  return 0;
}

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items.sort(sortFunction)))
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    product_name: req.body.product_name,
    model_name: req.body.model_name,
    seller_name: req.body.seller_name,
    material_type: req.body.material_type,
    price_version: req.body.price_version,
    price: req.body.price,
    total_quantity: req.body.total_quantity,
    note: req.body.note,
  });
  Item.find({
    product_name: req.body.product_name,
    model_name: req.body.model_name,
    seller_name: req.body.seller_name,
    material_type: req.body.material_type,
    price_version: req.body.price_version,
  })
    .then(item => {
      if(item.length === 0) {
        newItem.save().then(() => {
          Item.find().then(items => res.json(items.sort(sortFunction)));
        });
      } else {
        res.status(403).json({ error: "Item exists !" });
      }
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/items/edit
// @desc    Edit An Item
// @access  Public
router.post('/edit/:id', (req, res) => {
  const newItem = {
    product_name: req.body.product_name,
    model_name: req.body.model_name,
    seller_name: req.body.seller_name,
    material_type: req.body.material_type,
    price_version: req.body.price_version,
    total_quantity: req.body.total_quantity,
    price: req.body.price,
    note: req.body.note,
  };
  Item.findById(req.params.id)
    .then(item => {
      console.log('item', req.params.id, item);
      Item.updateMany({ _id: item._id }, { $set: { ...newItem } })
        .then(() => {
          Item.find().then(items => res.json(items.sort(sortFunction)));
        })
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/items/updateCount
// @desc    Update count of an Item
// @access  Public
router.post('/updateCount/:id', (req, res) => {
  const { quantity } = req.body;
  Item.findById(req.params.id)
    .then(item => {
      const qty = item.total_quantity + quantity;
      Item.updateOne({ _id: item._id }, { $set: { total_quantity: qty } })
        .then(() => {
          Item.find().then(items => res.json(items.sort(sortFunction)));
        })
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/items
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => {
      Item.find().then(items => res.json(items.sort(sortFunction)));
    }))
    .catch(() => res.status(404).json(err))
});

module.exports = router;