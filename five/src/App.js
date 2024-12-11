import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import { auth } from './firebase';

const App = () => {
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); 

  // Definir fecha de expiración (Ejemplo: 20 de diciembre de 2024)
  const expirationDate = new Date('2024-12-13'); 
  const currentDate = new Date();

  // Verificar si el código ha expirado
  const isExpired = currentDate > expirationDate;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null);  
      }
      setLoading(false);  
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si el código ha expirado, redirigir a una página de expiración o mostrar un mensaje
  if (isExpired) {
    return <div>El código ha expirado. No puedes usar la aplicación.</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Ruta raíz */}
        <Route path="/" element={<Navigate to={user ? '/home' : '/login'} />} />
        
        <Route
          path="/home"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
