const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.status(401).json({ message: 'Please login first' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user)
      return res.status(401).json({ message: 'User not found' });
    
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  next(); // Temporary — admin panel tayar thay pachhi enable kariye
};