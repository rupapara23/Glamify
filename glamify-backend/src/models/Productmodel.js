const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  salePrice:   { type: Number, default: 0 },
  category:    { type: String, required: true },
  subCategory: { type: String, default: '' },
  images:      [{ type: String }],
  stock:       { type: Number, default: 0 },
  isFeatured:  { type: Boolean, default: false },
  isActive:    { type: Boolean, default: true },
  reviews:     [reviewSchema],
  ratings:     { type: Number, default: 0 },
  numReviews:  { type: Number, default: 0 },
  tags:        [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);