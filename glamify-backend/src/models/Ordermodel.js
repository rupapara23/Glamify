const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    id:       String,
    name:     String,
    price:    Number,
    qty:      Number,
    image:    String,
  }],
  shippingAddress: {
    name:    String,
    email:   String,
    phone:   String,
    address: String,
    city:    String,
    pincode: String,
  },
  totalAmount:      { type: Number, required: true },
  paymentId:        { type: String, default: '' },
  razorpayOrderId:  { type: String, default: '' },
  paymentStatus:    { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  orderStatus:      { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);