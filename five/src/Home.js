import React from 'react';
import Lottie from 'lottie-react';  
import { auth } from './firebase';  
import { useNavigate } from 'react-router-dom';
import Animation from './Animation.json';
import './Home.css';  
import logo from './logo.png'; 


const Home = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await auth.signOut();  
      console.log("Sesión cerrada");
      navigate('/login');  
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    
<div className="home-container">
  {/* Botón en la parte superior izquierda */}
  <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
  <img src={logo} alt="Logo" className="logo" />
  
  <div className="content-container">
    {/* Animación en la parte izquierda */}
    <div className="animation-container">
      <Lottie animationData={Animation} loop={true} autoplay={true} style={{ width: 420, height: 420 }} />
    </div>

    {/* Texto y preguntas a la derecha */}
    <div className="text-container">
      <h2> Hola {auth.currentUser?.email || 'a nuestra aplicación'} :)</h2>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>
    
      <div className="question">
        <p>1. ¿Ud cree que Heidy pase ED?</p>
        <div className="answers">
          <label>
            <input type="radio" name="question1" value="a" />
            Obvio no
          </label>
          <label>
            <input type="radio" name="question1" value="b" />
            No le tengo fe
          </label>
          <label>
            <input type="radio" name="question1" value="c" />
            El próximo semestre tal vez
          </label>
        </div>
      </div>

      <div className="question">
        <p>2. ¿Por qué ver The Office?</p>
        <div className="answers">
          <label>
            <input type="radio" name="question2" value="a" />
            Es arte
          </label>
          <label>
            <input type="radio" name="question2" value="b" />
            Soy una persona culta
          </label>
          <label>
            <input type="radio" name="question2" value="c" />
            Me gusta su humor
          </label>
        </div>
      </div>


       {/* OTRA SECCION*/}
      <h2> Hola {auth.currentUser?.email || 'a nuestra aplicación'} :)</h2>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>
      <p> Wachu wachu wachu, Wachu wachu wachu, Wachu wachu wachu</p>

      <div className="question">
        <p>2. ¿Por qué ver The Office?</p>
        <div className="answers">
          <label>
            <input type="radio" name="question33" value="a" />
            Es arte
          </label>
          <label>
            <input type="radio" name="question33" value="b" />
            Soy una persona culta
          </label>
          <label>
            <input type="radio" name="question33" value="c" />
            Me gusta su humor
          </label>
        </div>
      </div>

      <br/>
      <button className="ok-button">Enviar respuestas</button>




      
    </div>

    
  </div>
</div>



  );
};

export default Home;
