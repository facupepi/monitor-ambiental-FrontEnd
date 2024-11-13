// Importa la biblioteca React, necesaria para utilizar JSX y definir componentes
import React from 'react';

// Importa ReactDOM para manipular el DOM en aplicaciones React
import ReactDOM from 'react-dom/client';

// Importa el archivo CSS global de la aplicación
import './index.css';

// Importa el componente principal de la aplicación, donde se define la estructura principal y las rutas
import App from './App';

// Crea una "raíz" de React en el elemento con el id 'root' en el archivo HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente App dentro del elemento raíz, lo que inicia la aplicación y muestra la interfaz en el navegador
root.render(
  <App />
);
