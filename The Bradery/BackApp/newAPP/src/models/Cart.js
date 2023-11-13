const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/dbUtils'); 

const Cart = sequelize.define('Cart', {
  cartId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
}); 

module.exports = Cart;
