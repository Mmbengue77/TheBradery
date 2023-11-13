const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Assuming you have a Cart model
const { connection, createOrdersTable } = require('../utils/dbUtils');

// Function to initialize the database and create the table if it doesn't exist
function initializeDatabase() {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
      } else {
        console.log('Connected to the database');
        createOrdersTable(); // Call the function to create the table
      }
    });
  }  

  initializeDatabase();
  
// Function to place an order
exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch the user's cart items
    const cartItems = await Cart.findAll({
      where: { userId },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Add items to the cart first.' });
    }

    // Calculate the total price of the order
    const totalPrice = cartItems.reduce((total, cartItem) => {
      // You can fetch the product price from your Product model if needed
      return total + cartItem.quantity * cartItem.productPrice;
    }, 0);

    // Create the order    
    const order = await Order.create({
      userId,
      totalPrice,
      orderDate: new Date(),
      // Add more fields as needed
    });

    // Clear the user's cart (remove all cart items)
    await Cart.destroy({
      where: { userId },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
