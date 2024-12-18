import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Animation from './Animation.json';
import './Home.css';
import logo from './logo.png';

const Home = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    question6: 0,
    question7: 0,
    question8: 0,
  });
  const [resistencia, setResistencia] = useState('');
  const [resistenciaValue, setResistenciaValue] = useState(0);
  const [RQD, setRQD] = useState('');
  const [RQDValue, setRQDValue] = useState(0);

   // Estado para manejar la visibilidad del modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [RMR, setRMR] = useState(0); // Estado para almacenar el valor del RMR

   const handleResponseChange = (question, value) => {
    setResponses(prev => ({
      ...prev,
      [question]: parseFloat(value),
    }));
  };

  const handleResistenciaChange = (e) => {
    const value = e.target.value;
    setResistencia(value);
  
    // Convertir el valor a número y aplicar las condiciones
    const numValue = parseFloat(value);
    let points = 0;
  
    if (numValue > 250) {
      points = 15;
    } else if (numValue >= 100 && numValue <= 250) {
      points = 12;
    } else if (numValue >= 50 && numValue < 100) {
      points = 7;
    } else if (numValue >= 25 && numValue < 50) {
      points = 4;
    } else if (numValue >= 5 && numValue < 25) {
      points = 2;
    } else if (numValue >= 1 && numValue < 5) {
      points = 1;
    } else if (numValue < 1) {
      points = 0;
    }
  
    setResistenciaValue(points);
  };

  const handleRQDChange = (e) => {
    const valor = e.target.value;
    setRQD(valor);
  
    // Convertir el valor a número y aplicar las condiciones
    const numValor = parseFloat(valor);
    let point = 0;
  
    if (numValor > 100) {
      alert('El RQD va de 0 a 100% Estudie pendejo');
    } else if (numValor >= 90 && numValor <= 100) {
      point = 20;
    } else if (numValor >= 75 && numValor < 90) {
      point = 17;
    } else if (numValor >= 50 && numValor < 75) {
      point = 13;
    } else if (numValor >= 25 && numValor < 50) {
      point = 6;
    } else{
      point = 3;
    }
  
    setRQDValue(point);
  };

   // Función para manejar el envío de respuestas
   const handleSubmit = () => {
    // Calcular el RMR sumando los valores de las respuestas
    const totalRMR = Object.values(responses).reduce((acc, curr) => acc + curr, 0) + resistenciaValue + RQDValue;
    setRMR(totalRMR);

    // Mostrar el modal después de enviar
    setIsModalOpen(true);
  };

   // Función para determinar el mensaje según el RMR
   const getRMRMessage = (RMR) => {
    if (RMR > 80) return "Tipo 1 Muy buena. Masa rocosa excelente (capaz de soportar grandes cargas sin problemas).";
    if (RMR >= 61) return "Tipo 2 Buena. Buena masa rocosa (buena capacidad de soporte).";
    if (RMR >= 41) return "Tipo 3 Regular. Masa rocosa razonablemente buena (soporte moderado).";
    if (RMR >= 21) return "Tipo 4 Mala. Masa rocosa deficiente (soporte débil).";
    return "Tipo 5 Muy Mala. Masa rocosa muy pobre (requiere refuerzo o es inadecuada para excavación).";
  };

  const getotherMessage = (RMR) => {
    if (RMR > 80) return "RMR > 81:  Masa rocosa excelente. Avances de 3 m (capaz de soportar grandes cargas sin problemas). para el sostenimiento solo se utilizara algún bulon ocasional y el precio aproximado USD/m es 0 Roca autosostenible.";
    if (RMR >= 61) return "61-80: Buena masa rocosa. Avances de 1.5-3 m (buena capacidad de soporte). Bulonado local (enbóveda) Arcos ligeros, con separación de 1,5-2 m y el precio aproximado USD/m 300-400";
    if (RMR >= 41) return "41-60: Masa rocosa razonablemente buena. Avances de 1.5-2 m (soporte moderado). Bulonado sistemático (L-3-4 m. S=1-1.5 m) Arcos medios. separación de 1-1.5 m y el precio aproximado USD/m 500-700";
    if (RMR >= 21) return "21-40: Masa rocosa deficiente. Avances de 1-1.5 m (soporte débil). Bulonado sistemático (L-4-5 m. S=1-1.5 m) Arcos pesados, Separación 0.75-1 m y el precio aproximado USD/m 700-900";
    return "0-20: Masa rocosa muy pobre. Avances de 0.5-1 m (requiere refuerzo o es inadecuada para excavación). Bulonado sistemático (L-5-6 m. S=1-1.5 m). Arcos pesados, Separación 0.75-1 m y el precio aproximado USD/m 900-1300";
  };

  const getGoyoMessage = (RMR) => {
    if (RMR > 80) return "Factor de seguridad = 1.35";
    if (RMR >= 61) return "Factor de seguridad = 1.62";
    if (RMR >= 41) return "Factor de seguridad = 1.685";
    if (RMR >= 21) return "Factor de seguridad = 1.263";
    return "Factor de seguridad = 1.062";
  };



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


    // Función para cerrar el modal
    const closeModal = () => {
      setIsModalOpen(false);
    };

    // Función para recargar y volver a responder

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
          <div className="input">
            <label>
              Resistencia
              <input 
                type="number" 
                placeholder="Ingrese la resistencia" 
                value={resistencia} 
                onChange={handleResistenciaChange}
                min="0"
                step="0.1"
              />
              {resistencia && (
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.9em', 
                  color: '#666', 
                  marginTop: '4px' 
                }}>
                  Puntos: {resistenciaValue}
                </span>
              )}
            </label>
            <label>
              RQD
              <input 
                type="number" 
                placeholder="Ingrese el RQD" 
                value={RQD} 
                onChange={handleRQDChange}
                min="0"
                step="0.1"
              />
              {RQD && (
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.9em', 
                  color: '#666', 
                  marginTop: '4px' 
                }}>
                  Puntos: {RQDValue}
                </span>
              )}
            </label>
          </div>

          <hr /> {/* Línea para separar secciones */}

          {/* Segunda sección: Preguntas */}
          <div className="question">
            <p>1. La abertura se refiere al tamaño de las grietas o fisuras en la roca. Si son grandes, puede pasar más agua, pero también debilitan más la roca. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo describirías la abertura de las grietas en la roca? ¿Son grandes como una fisura ancha o pequeñas como líneas finas?</h3>
            <div className="answers">
              <label>
                <input type="radio" name="question1" value="0" onChange={(e) => handleResponseChange('question1', e.target.value)} required/>
                ¿La abertura es tan grande como el tamaño de tu dedo pequeño de la mano o es más grande?
              </label>
              <label>
                <input type="radio" name="question1" value="3" onChange={(e) => handleResponseChange('question1', e.target.value)}/>
                ¿La abertura es tan fina como un alambre?
              </label>
              <label>
                <input type="radio" name="question1" value="5" onChange={(e) => handleResponseChange('question1', e.target.value)}/>
                ¿La abertura es más fina que la hebra de un cabello humano?
              </label>
              <label>
                <input type="radio" name="question1" value="6" onChange={(e) => handleResponseChange('question1', e.target.value)}/>
                No se visualiza nada
              </label>
              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>              
            </div>
          </div>
          <hr></hr>
          <div className="question">
            <p>2. La rugosidad describe cuán ásperas o lisas son las superficies dentro de las grietas o discontinuidades. Si las superficies son rugosas, las partículas de la roca se mantienen más unidas. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo son las superficies de las grietas? ¿Son lisas o rugosas?</h3>
            <div className="answers">
              <label>
                <input type="radio" name="question2" value="0" onChange={(e) => handleResponseChange('question2', e.target.value)}/>
                Liso como la Porcelana
              </label>
              <label>
                <input type="radio" name="question2" value="3" onChange={(e) => handleResponseChange('question2', e.target.value)}/>
                Liso como la cáscara de Durazno
              </label>
              <label>
                <input type="radio" name="question2" value="5" onChange={(e) => handleResponseChange('question2', e.target.value)}/>
                Rugoso como la piel de viejita
              </label>
              <label>
                <input type="radio" name="question2" value="6" onChange={(e) => handleResponseChange('question2', e.target.value)}/>
                Rugoso como la cáscara de Piña
              </label>
              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <hr /> {/* Línea para separar secciones */}

          <div className="question">
            <p>3. El relleno es el material que puede quedar dentro de las grietas o fisuras de la roca. Si hay material blando como arcilla, la roca será más débil. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo describirías el material dentro de las grietas de la roca? ¿Está lleno de tierra, barro o alguna otra sustancia, o está vacío y limpio?</h3>
            <div className="answers">
              <label>
                <input type="radio" name="question3" value="2" onChange={(e) => handleResponseChange('question3', e.target.value)}/>
                ¿Este relleno es tan duro como una piedra grande ó como un bloque de cemento?
              </label>
              <label>
                <input type="radio" name="question3" value="2" onChange={(e) => handleResponseChange('question3', e.target.value)}/>
                ¿Este relleno se siente más como barro suave pero que no se desmorona fácilmente?
              </label>
              <label>
                <input type="radio" name="question3" value="0" onChange={(e) => handleResponseChange('question3', e.target.value)}/>
                ¿Es como tierra mojada o arcilla que se deshace al tocarla?
              </label>
              <label>
                <input type="radio" name="question3" value="4" onChange={(e) => handleResponseChange('question3', e.target.value)}/>
                ¿Este relleno es como una roca sólida, algo que ni con un martillo podrías romper fácil?
              </label>
              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <hr></hr>

          <div className="question">
            <p>4. La alteración se refiere a qué tan cambiada o dañada está la roca dentro de la grieta. Las rocas muy alteradas son más frágiles. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo describirías el estado de la roca dentro de las grietas? ¿Está bastante alterada, como si estuviera desintegrándose, o sigue firme y sólida?</h3>
            <div className="answers">

              <label>
                <input type="radio" name="question4" value="6" onChange={(e) => handleResponseChange('question4', e.target.value)}/>
                Si le pasas la uña, ¿sientes algo como el vidrio, duro y sin irregularidades?
              </label>

              <label>
                <input type="radio" name="question4" value="5" onChange={(e) => handleResponseChange('question4', e.target.value)}/>
                ¿Es como una pared pintada que se ve bien, pero tiene algunas marcas o rayones por el uso?
              </label>

              <label>
                <input type="radio" name="question4" value="3" onChange={(e) => handleResponseChange('question4', e.target.value)}/>
                ¿Es como un libro con algunas páginas arrugadas, pero aún legible?
              </label>

              <label>
                <input type="radio" name="question4" value="1" onChange={(e) => handleResponseChange('question4', e.target.value)}/>
                ¿La roca parece tan rota que cualquier pedazo que toques se cae, como una hoja seca que se deshace al apretarla?
              </label>

              <label>
                <input type="radio" name="question4" value="0" onChange={(e) => handleResponseChange('question4', e.target.value)}/>
                ¿Es como un papel mojado que, al intentar leerlo, se deshace en pedazos al tocarlo?
              </label>

            </div>
          </div> 

          <hr></hr>      

          <div className="question">
            <p>5. El agua freática es el agua que se encuentra bajo la superficie, en las grietas de las rocas. El agua puede afectar la estabilidad de la roca, ya que puede hacerla más débil o causar deslizamientos. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo describirías la presencia de agua dentro de las grietas de la roca? ¿Está mojada como si tuviera agua filtrándose, o está completamente seca?</h3>
            <div className="answers">
              <label>
                <input type="radio" name="question5" value="5" onChange={(e) => handleResponseChange('question5', e.target.value)}/>
                ¿El lugar se encuentra seco, es decir que no se siente ni un poco de humedad, como una esponja que acabas de comprar?
              </label>

              <label>
                <input type="radio" name="question5" value="3.333" onChange={(e) => handleResponseChange('question5', e.target.value)}/>
                ¿El suelo y las paredes están un poquito mojados, como cuando tocas una piedra que estuvo en la lluvia pero no está empapada?
              </label>

              <label>
                <input type="radio" name="question5" value="2.333" onChange={(e) => handleResponseChange('question5', e.target.value)}/>
                ¿El lugar está bastante mojado, como cuando sales a caminar bajo la lluvia y te mojas mucho, pero no hay charcos?
              </label>

              <label>
                <input type="radio" name="question5" value="1.333" onChange={(e) => handleResponseChange('question5', e.target.value)}/>
                ¿Hay agua que cae desde las paredes o el techo, como cuando una gota de agua cae de un grifo que está un poquito abierto?
              </label>

              <label>
                <input type="radio" name="question5" value="0" onChange={(e) => handleResponseChange('question5', e.target.value)}/>
                ¿Está corriendo agua como cuando un río o una quebrada tiene corriente de agua moviéndose de un lado a otro?
              </label>
              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <hr></hr>

          <div className="question">
            <p>6. Caudal por 10 m de túnel</p>
            <div className="answers">
              <label>
                <input type="radio" name="question6" value="5" onChange={(e) => handleResponseChange('question6', e.target.value)}/>
                ¿Es como cuando abres el grifo y no sale ni una gota?
              </label>

              <label>
                <input type="radio" name="question6" value="3.333" onChange={(e) => handleResponseChange('question6', e.target.value)}/>
                ¿Es como cuando abres el grifo, pero solo sale un chorro chiquito de agua?
              </label>

              <label>
                <input type="radio" name="question6" value="2.333" onChange={(e) => handleResponseChange('question6', e.target.value)}/>
                ¿Es como cuando dejas la llave un poco abierta y sale un chorrito decente?
              </label>

              <label>
                <input type="radio" name="question6" value="1.333" onChange={(e) => handleResponseChange('question6', e.target.value)}/>
                ¿Es como cuando la manguera sale con un buen chorro, pero no es un río?
              </label>

              <label>
                <input type="radio" name="question6" value="0" onChange={(e) => handleResponseChange('question6', e.target.value)}/>
                ¿Es como cuando dejas abierta la manguera y el agua sale a chorros como si fuera una cascada?
              </label>

              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <hr></hr>

          <div className="question">
            <p>7. Relación presión de agua/Tensión principal mayor</p>
            <div className="answers">
              <label>
                <input type="radio" name="question7" value="5" onChange={(e) => handleResponseChange('question7', e.target.value)}/>
                ¿Es como cuando abres el grifo y no sale ni una gota de agua, como si estuviera cerrado?
              </label>

              <label>
                <input type="radio" name="question7" value="3.333" onChange={(e) => handleResponseChange('question7', e.target.value)}/>
                ¿Hay un poquito de presión de agua, como cuando abres una llave de agua y sale solo un hilito pequeño?
              </label>

              <label>
                <input type="radio" name="question7" value="2.333" onChange={(e) => handleResponseChange('question7', e.target.value)}/>
                ¿Sientes que hay algo de presión, como cuando el agua sale de un grifo, pero no con mucha fuerza, solo un poco?
              </label>

              <label>
                <input type="radio" name="question7" value="1.333" onChange={(e) => handleResponseChange('question7', e.target.value)}/>
                ¿Hay una presión media de agua, como cuando la manguera de un jardín tiene un chorro moderado de agua?
              </label>

              <label>
                <input type="radio" name="question7" value="0" onChange={(e) => handleResponseChange('question7', e.target.value)}/>
                ¿Sientes que hay mucha presión de agua, como cuando una manguera está a máxima potencia y el agua sale muy fuerte?
              </label>

              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <hr></hr>

          <div className="question">
            <p>8. El espaciamiento se refiere a la distancia entre las fisuras o grietas dentro de una roca. Cuanto más juntas estén las grietas, más débil puede ser la roca. Para calcular este parámetro responde la siguiente pregunta.</p>
            <h3>¿Cómo describirías el espaciamiento entre las grietas o fracturas de la roca?</h3>
            <div className="answers">
              <label>
                <input type="radio" name="question8" value="7" onChange={(e) => handleResponseChange('question8', e.target.value)}/>
                El espacio mide aproximadamente entre una y tres cuartas?
              </label>

              <label>
                <input type="radio" name="question8" value="2" onChange={(e) => handleResponseChange('question8', e.target.value)}/>
                El espacio mide más o menos 4 dedos?
              </label>

              <label>
                <input type="radio" name="question8" value="14" onChange={(e) => handleResponseChange('question8', e.target.value)}/>
                El espacio mide entre medio metro a dos metros?
              </label>

              <label>
                <input type="radio" name="question8" value="17" onChange={(e) => handleResponseChange('question8', e.target.value)}/>
                El espacio mide alrededor de dos metros?
              </label>

              <p>(Selecciona la opción que mejor se acerque a lo que ves.)</p>
            </div>
          </div>

          <br />
          <button className="ok-button" onClick={handleSubmit}>Enviar respuestas</button>
        </div>

       {/* Modal de confirmación */}
       {isModalOpen && (
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <h3>RMR: {RMR}</h3>
              <p>{getRMRMessage(RMR)}</p>
              <p>{getotherMessage(RMR)}</p>
              <p>{getGoyoMessage(RMR)}</p>
              <button className="outt-button" onClick={closeModal}>Cerrar</button>
              <button className="ok-button" onClick={() => window.location.reload()}>Recargar y volver a responder</button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Home;
