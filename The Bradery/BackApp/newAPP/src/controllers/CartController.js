const Cart = require('../models/Cart');
const Product = require('../models/product'); // Assuming you have a Product model
const { connection, createCartTable } = require('../utils/dbUtils');

// Function to initialize the database and create the table if it doesn't exist
function initializeDatabase() {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
      } else {
        console.log('Connected to the database');
        createCartTable(); // Call the function to create the table
      }
    });
  }
    // Initialize the database when the application starts
    initializeDatabase();


exports.addToCart = async (req, res) => {
    const cartId = req.cookies.cartId;
    const {productId, quantity } = req.body;

  try {
    // Check if the product is available
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the quantity requested is available in stock
    if (quantity > product.inventory) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    // Check if the user already has this product in the cart; if yes, update the quantity
    const existingCartItem = await Cart.findOne({
      where: { cartId, productId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    }

    // If the product is not in the cart, create a new cart item
    const newCartItem = await Cart.create({
      cartId,
      productId,
      quantity,
    });

    res.status(201).json(newCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update the quantity of a product in the user's cart
exports.updateCart = async (req, res) => {
    const cartId = req.cookies.cartId;
    const {productId, quantity } = req.body;
  
    try {
      // Check if the product is available
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Check if the user has the product in their cart
      const cartItem = await Cart.findOne({
        where: { cartId, productId },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      // Check if the new quantity is available in stock
      if (quantity > product.inventory) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
  
      // Update the cart item with the new quantity
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Function to remove a product from the user's cart
  exports.removeFromCart = async (req, res) => {
    const cartId = req.cookies.cartId;
    const {productId} = req.body;
  
    try {
      // Check if the user has the product in their cart
      const cartItem = await Cart.findOne({
        where: { cartId, productId },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      // Remove the cart item
      await cartItem.destroy();
  
      res.status(204).send(); // Respond with 204 (No Content) for a successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
