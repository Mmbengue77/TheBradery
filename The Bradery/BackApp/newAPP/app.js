const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/start-session', (req, res) => {
  // Generate a unique cart ID (you can use a library like `uuid` for this)
  const cartId = uuidv4();

  // Set the cart ID as a cookie
  res.cookie('cartId', cartId);

  res.send('Session started with cart ID: ' + cartId);
});
// Middleware for parsing JSON data
app.use(express.json());

// Import and use the product routes (and any other routes you may have)
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes'); // Add Cart routes
const orderRoutes = require('./src/routes/orderRoutes'); // Add Order routes

app.use('/products', productRoutes);
app.use('/cart', cartRoutes); // Use Cart routes
app.use('/orders', orderRoutes); // Use Order routes

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
