import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

function Home() {

    const [centrales, setCentrales] = useState([]);

    useEffect(() => {
        fetch("https://monitor-de-gases-back.onrender.com/stations", requestOptions)
        .then((response) => response.json())
        .then((result) => setCentrales(result))
        .catch((error) => console.error(error));
    },[]);

    return (
        <div className="home-container">
            <div className="column-container">
                {/* Columna 1: Header y Call to Action */}
                <div className="left-column">
                    <header className="home-header">
                        <h1>Bienvenido a la Plataforma de Monitoreo Ambiental</h1>
                        <p>Controla y monitorea en tiempo real las condiciones  de tu hogar. Protege a tu familia de gases peligrosos y mantén el control total desde una única plataforma.</p>
                        <Link to="/about" className="btn">Conoce más</Link>
                    </header>

                    <section className="call-to-action-section">
                        <h2>¡Mantente Seguro!</h2>
                        <p>No dejes tu seguridad al azar. Comienza a monitorear tus espacios hoy mismo y recibe alertas en tiempo real.</p>
                        <Link to="/contact" className="btn">Contáctanos para más información</Link>
                    </section>
                </div>

                {/* Columna 2: Centrales */}
                <div className="right-column">
                    <section className="centrales-section">
                        <h2>Nuestras Centrales de Monitoreo</h2>
                        <p>Selecciona una central para ver los detalles de las lecturas en tiempo real.</p>

                        <div className="centrales-list">
                            { centrales.length !== 0 ? 
                                centrales.map((central) => (
                                <div key={central.id} className="item">
                                    <h3>{central.name}</h3>
                                    <p> <strong>Ubicación:</strong> {central.location}</p>
                                    <Link to={`/central/${central.id}/${central.name}/${central.location}`} className="btn">Ver Detalles</Link>
                                </div>
                            ))
                            :  <div className='loader-container'>
                                    <div className="loader">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Home;
