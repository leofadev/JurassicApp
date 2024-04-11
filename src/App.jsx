import  { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbydyRvTTgmNfBjmTMWnS3NbeaTSmmR5eVtVTo03K36U46ukShua2sXkM_6IGByAQfI/exec')
      .then(response => response.json())
      .then(result => setData(result.data)) // Asegúrate de acceder a la propiedad 'data' si es necesario
      .catch(error => console.error('Error:', error));
  }, []);
   // El array vacío como segundo argumento indica que este efecto se ejecutará solo una vez después de la renderización inicial.

  return (
    <div className="App">
      <h1>Datos de Dinosaurios</h1>
      <div className="card-container">
        {data.map((dinosaurio, index) => (
          <div key={`${dinosaurio.name}-${dinosaurio.Especie}-${dinosaurio["Name Movie"]}-${dinosaurio.type}-${index}`} className="card">
            <img className='img-thumbnail' src={dinosaurio.image} alt={dinosaurio.name} />
            <div className="card-content">
              <h3>{dinosaurio.name}</h3>
              <p>Especie: {dinosaurio.Especie}</p>
              <p>Tipo: {dinosaurio.type}</p>
              <p>Película: {dinosaurio["Name Movie"]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

