const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Route to place an order
router.post('/place-order', OrderController.placeOrder);

module.exports = router;
  