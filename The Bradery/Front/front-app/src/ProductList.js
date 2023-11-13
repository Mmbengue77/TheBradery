import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:3000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error(error);
        setError('Erreur lors du chargement des produits');
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.stock} en stock
            <button onClick={() => addToCart(product.id)}>Ajouter au panier</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
