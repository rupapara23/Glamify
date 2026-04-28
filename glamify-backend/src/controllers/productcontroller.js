const Product = require('../models/Productmodel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, sort, featured } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    if (search)   query.name = { $regex: search, $options: 'i' };

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc')  sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating')     sortOption = { ratings: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    body.price    = Number(body.price);
    body.salePrice = Number(body.salePrice) || 0;
    body.stock    = Number(body.stock);

    // Multer uploaded files
    if (req.files && req.files.length > 0) {
      body.images = req.files.map(f => `/uploads/products/${f.filename}`);
    } else if (body.images && typeof body.images === 'string') {
      body.images = body.images.split(',').map(s => s.trim());
    }

    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product (admin)
exports.updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.price)     body.price     = Number(body.price);
    if (body.salePrice) body.salePrice = Number(body.salePrice) || 0;
    if (body.stock)     body.stock     = Number(body.stock);

    // Multer uploaded files
    if (req.files && req.files.length > 0) {
      body.images = req.files.map(f => `/uploads/products/${f.filename}`);
    } else if (body.images && typeof body.images === 'string') {
      body.images = body.images.split(',').map(s => s.trim());
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, body, { new: true }
    );
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product (admin)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    const { rating, comment } = req.body;
    const review = {
      user:    req.user._id,
      name:    req.user.name,
      rating:  Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};