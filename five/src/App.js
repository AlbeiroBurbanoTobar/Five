
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import { auth } from './firebase';

const App = () => {
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); 

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
