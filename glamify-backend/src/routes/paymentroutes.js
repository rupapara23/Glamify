const router = require('express').Router();
const { createOrder, verifyPayment, getMyOrders } = require('../controllers/paymentcontroller');
const { protect } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify',       protect, verifyPayment);
router.get('/my-orders',     protect, getMyOrders);

module.exports = router;