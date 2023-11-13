import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import Login from './Login';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const checkout = () => {
    // Logique de traitement pour la validation de la commande
    console.log('Checkout function called');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout}>Se déconnecter</button>
          <ProductList addToCart={setCart} />
          <Cart cart={cart} checkout={checkout} />
        </>
      )}
    </div>
  );
};

export default App;
