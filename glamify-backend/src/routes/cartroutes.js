const router = require('express').Router();
const { protect } = require('../middleware/auth');

let carts = {}; // Simple in-memory (MongoDB model pachhi banaishu)

// Cart get karo
router.get('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  res.json({ items: carts[userId] || [] });
});

// Cart save karo
router.post('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  carts[userId] = req.body.items || [];
  res.json({ message: 'Cart saved', items: carts[userId] });
});

module.exports = router;