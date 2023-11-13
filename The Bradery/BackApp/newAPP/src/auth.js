const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'votre_secret_key_secrete';

function generateToken(user) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePasswords(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePasswords };
