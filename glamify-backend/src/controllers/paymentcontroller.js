const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Ordermodel');

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Razorpay order create karo
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount:   amount * 100,
      currency: "INR",
      receipt:  `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Payment verify karo + MongoDB maa save karo
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      shippingAddress,
      totalAmount,
    } = req.body;

    // Signature verify karo
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // MongoDB maa order save karo
    const order = await Order.create({
      user:            req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentId:       razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentStatus:   'paid',
      orderStatus:     'processing',
    });

    res.json({ 
      success: true, 
      message: "Payment verified!", 
      orderId: order._id 
    });

  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: err.message });
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