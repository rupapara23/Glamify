const Order = require('../models/Ordermodel');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalAmount } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: 'No items in order' });

    const order = await Order.create({
      user: req.user._id,
      items, shippingAddress, paymentMethod,
      itemsPrice, shippingPrice, totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// My orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');
    if (!order) 
      return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin - all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin - update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) 
      return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    if (req.body.status === 'delivered') {
      order.deliveredAt = Date.now();
      order.paymentStatus = 'paid';
    }

    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};