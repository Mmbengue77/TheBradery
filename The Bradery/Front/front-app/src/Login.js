import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    axios.post('http://localhost:3000/api/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        onLogin();
      })
      .catch(error => {
        console.error(error);
        setError("Nom d'utilisateur ou mot de passe incorrect");
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
