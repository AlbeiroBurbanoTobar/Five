import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Animation from './Animation.json';
import './Home.css';
import logo from './logo.png';

const Home = () => {
  const navigate = useNavigate();

  // Estado para manejar los valores de los inputs
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Sesión cerrada");
      navigate('/login');
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  // Función para manejar el envío de respuestas
  const handleSubmit = () => {
    // Aquí puedes usar los valores de name y age junto con las respuestas a las preguntas
    console.log("Nombre:", name);
    console.log("Edad:", age);
    // Luego puedes hacer lo que necesites, como enviar los datos a un servidor
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

        {/* Texto y primera sección de inputs */}
        <div className="text-container">
          <h2> Hola, empecemos las preguntas. 😁</h2>
          <h3>Para empezar rellena los campos</h3>

          {/* Primera sección: 2 Inputs */}
          <div className="input-section">
            <label>
              Resistencia
              <input 
                type="number" 
                placeholder="Ingrese la resistencia" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </label>
            <label>
              RQD
              <input 
                type="number" 
                placeholder="Ingrese el RQD" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
              />
            </label>
          </div>

          <hr /> {/* Línea para separar secciones */}

          {/* Segunda sección: Preguntas */}
          <div className="question">
            <p>1. ¿Preguntas de opciones multiples?</p>
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
            <p>2. ¿Preguntas de opciones multiples?</p>
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

          <hr /> {/* Línea para separar secciones */}

          <div className="question">
            <p>3. ¿Preguntas de una sola opciones?</p>
            <div className="answers">
              <label>
                <input type="radio" name="question3" value="a" />
                Es arte
              </label>
              <label>
                <input type="radio" name="question3" value="b" />
                Soy una persona culta
              </label>
              <label>
                <input type="radio" name="question3" value="c" />
                Me gusta su humor
              </label>
            </div>
          </div>

          <div className="question">
            <p>4. ¿Preguntas de una sola opciones?</p>
            <div className="answers">
              <label>
                <input type="radio" name="question4" value="a" />
                Es arte
              </label>
              <label>
                <input type="radio" name="question4" value="b" />
                Soy una persona culta
              </label>
              <label>
                <input type="radio" name="question4" value="c" />
                Me gusta su humor
              </label>
            </div>
          </div>          

          <br />
          <button className="ok-button" onClick={handleSubmit}>Enviar respuestas</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
