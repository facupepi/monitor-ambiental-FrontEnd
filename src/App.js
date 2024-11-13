import React from "react";
// Importación de componentes
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Importación de React Router para el enrutamiento de la aplicación
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importación de Bootstrap para los estilos
import 'bootstrap/dist/css/bootstrap.min.css';
// Importación de los estilos personalizados
import './App.css';

// Componentes adicionales para la visualización de lecturas y datos centrales
import Readings from "./components/Readings/Readings";
import Central from "./components/Central/Central";

// Componente principal de la aplicación
function App() {
  return (
    // Envolver la aplicación en el componente Router para el enrutamiento
    <Router>
      {/* Componente de encabezado */}
      <Header />
      <div className="app-container">
        <div className="page-content">
          {/* Definición de rutas dentro de la aplicación */}
          <Routes>
            {/* Ruta principal que renderiza el componente Home */}
            <Route path="/" element={<Home />} />
            {/* Ruta que renderiza las lecturas para un 'central' específico */}
            <Route path="/central/:id/:name/:location/readings/:type" element={<Readings />} />
            {/* Ruta para ver los detalles de un 'central' específico */}
            <Route path="/central/:id/:name/:location" element={<Central />} />
            {/* Ruta para la página de 'About' */}
            <Route path="/about" element={<About />} />
            {/* Ruta para la página de 'Contact' */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <div className="footer-container">
        {/* Componente de pie de página */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
