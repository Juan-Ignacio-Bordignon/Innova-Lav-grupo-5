import React, { useState } from 'react';

function App() {
  const [altoContraste, setAltoContraste] = useState(false);

  const cambiarModo = () => {
    const proximoEstado = !altoContraste;
    setAltoContraste(proximoEstado);
    
    if (proximoEstado) {
      document.body.setAttribute('data-theme', 'high-contrast');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Mapa CFP N° 7</h1>
      <p>Entorno de prueba de accesibilidad</p>
      
      <button 
        onClick={cambiarModo} 
        style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' }}
      >
        {altoContraste ? 'Ver Modo Normal' : 'Ver Alto Contraste'}
      </button>
    </div>
  );
}

export default App;