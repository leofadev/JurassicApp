import  { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Usa fetch() para hacer una solicitud GET a tu API
    fetch('https://script.google.com/macros/s/AKfycby0crc4kbWAiynTe6DOGrtICHSG5WOOG2rb0erD4vTy7OznrAZdoDYiTsU4sggPXVvA/exec')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));

  }, []); // El array vacío como segundo argumento indica que este efecto se ejecutará solo una vez después de la renderización inicial.

  return (
    <div className="App">
      <h1>Datos de Dinosaurios</h1>
      <ul>
        {data.map((dinosaurio, index) => (
          <li key={`${dinosaurio.name}-${dinosaurio.Especie}-${dinosaurio["Name Movie"]}-${dinosaurio.type}-${index}`}>
            {dinosaurio["Name Movie"]} - {dinosaurio.name} - {dinosaurio.Especie} - {dinosaurio.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

