import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import backgroundImage from './background-image.jpg';
import logo from './logo.png'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Intentando iniciar sesión con', email);
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      console.log("Login exitoso");
      navigate('/home');
    } catch (err) {
      setError(err.message);
      console.error("Error durante el login:", err);
    }
  };

  
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'darken',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
       
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;