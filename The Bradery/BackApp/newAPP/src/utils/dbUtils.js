const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp',
};
  
const connection = mysql.createConnection(dbConfig);

// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: false, // Disable SQL query logging if not needed
  });

// Function to create the Products table if it doesn't exist
function createProductsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        inventory INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Products table:', err);
    } else {
      console.log('Products table created (or already exists).');
    }
  });
}

// Function to create the Cart table if it doesn't exist
function createCartTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cartId VARCHAR(150) NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableSQL, (err, results) => {
    if (err) {
      console.error('Error creating Cart table:', err);
    } else {
      console.log('Cart table created (or already exists).');
    }
  });
}

function createOrdersTable() {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        totalPrice DECIMAL(10, 2) NOT NULL,
        orderDate DATETIME NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    `;
  
    connection.query(createTableSQL, (err, results) => {
      if (err) {
        console.error('Error creating Orders table:', err);
      } else {
        console.log('Orders table created (or already exists).');
      }
    });
  }
// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize: Database connection has been established successfully.');
  } catch (error) {
    console.error('Sequelize: Unable to connect to the database:', error);
  }
}

module.exports = {
    connection,
    sequelize,
    createProductsTable,   
    createCartTable,
    createOrdersTable,
    testDatabaseConnection,
};
