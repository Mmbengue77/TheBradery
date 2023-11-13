const Sequelize = require('sequelize');
const sequelize = new Sequelize('myapp', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Product = sequelize.define('Product', {
  name: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
  inventory: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
 
module.exports = Product;
  