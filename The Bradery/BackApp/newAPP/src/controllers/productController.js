const { Op } = require('sequelize');
const Product = require('../models/product'); // Import your Product model
const { connection, createProductsTable } = require('../utils/dbUtils');

// Function to initialize the database and create the table if it doesn't exist
function initializeDatabase() {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
      } else {
        console.log('Connected to the database');
        createProductsTable(); // Call the function to create the table
      }  
    });
  }
  
  // Initialize the database when the application starts
  initializeDatabase();

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new product
exports.createProduct = async (req, res) => {
  const { name, price, inventory } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      inventory,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, inventory } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.name = name;
      product.price = price;
      product.inventory = inventory;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
