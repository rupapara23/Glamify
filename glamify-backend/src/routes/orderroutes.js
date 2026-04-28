const router = require('express').Router();
const ctrl = require('../controllers/ordercontroller');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',          protect, ctrl.createOrder);
router.get('/myorders',   protect, ctrl.getMyOrders);
router.get('/:id',        protect, ctrl.getOrder);
router.get('/',           protect, adminOnly, ctrl.getAllOrders);
router.put('/:id/status', protect, adminOnly, ctrl.updateOrderStatus);
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;