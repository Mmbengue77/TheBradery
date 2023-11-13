const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Route to add a product to the cart
router.post('/add-to-cart', CartController.addToCart);

// Route to update the quantity of a product in the cart
router.put('/update-cart', CartController.updateCart);

// Route to remove a product from the cart
router.delete('/remove-from-cart', CartController.removeFromCart);
module.exports = router;
