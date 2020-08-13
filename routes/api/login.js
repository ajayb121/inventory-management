const express = require('express');
const router = express.Router();

// Item Model
const LoginModal = require('../../models/Login');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  LoginModal.find()
    .sort({ userId: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new LoginModal({
    userId: req.body.userId,
    password: req.body.password
  });
  newItem.save().then(item => res.json(item));
});

router.post('/validate', (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  
  LoginModal.find()
    .then(items => {
      items.map(ele => {
        if(ele.userId === userId && ele.password === password) {
          res.json({ loginSuccess: true })
        }
      })
      res.json({ logginSuccess: false })
    })
    .catch((err) => res.status(404).json(err))
});

// @route   POST api/items
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  LoginModal.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }))
});

module.exports = router;