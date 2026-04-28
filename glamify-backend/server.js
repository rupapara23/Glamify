const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:5173',
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server.js - debug version
try { app.use('/api/auth',     require('./src/routes/authroutes')); console.log('✅ auth routes loaded'); } catch(e) { console.error('❌ auth routes FAILED:', e.message); }
try { app.use('/api/products', require('./src/routes/productroutes')); console.log('✅ product routes loaded'); } catch(e) { console.error('❌ product routes FAILED:', e.message); }
try { app.use('/api/orders',   require('./src/routes/orderroutes')); console.log('✅ order routes loaded'); } catch(e) { console.error('❌ order routes FAILED:', e.message); }
try { app.use('/api/users',    require('./src/routes/userroutes')); console.log('✅ user routes loaded'); } catch(e) { console.error('❌ user routes FAILED:', e.message); }
try { app.use('/api/cart',     require('./src/routes/cartroutes')); console.log('✅ cart routes loaded'); } catch(e) { console.error('❌ cart routes FAILED:', e.message); }
try { app.use('/api/payment',  require('./src/routes/paymentroutes')); console.log('✅ payment routes loaded'); } catch(e) { console.error('❌ payment routes FAILED:', e.message); }
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'Glamify API is running!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });