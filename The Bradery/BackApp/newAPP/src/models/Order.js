const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbUtils'); // Your Sequelize connection

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },   
});

module.exports = Order;
