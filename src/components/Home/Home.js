import { Link } from "react-router-dom";
import Gauge from "../Gauge/Gauje";
import React from 'react';

function Home() {
    return (
    <div className="container-home">
        <div className="gauge-item">
            <Gauge ckey={0} value = {90} min = {0}  max = {100} label = 'Temperatura' units = 'ºC' colorMin = "#cefcdd" colorMax = "#05f654" />
            <Link to="/readings/Temperatura" className="gauge-btn">Ver Detalles</Link>
        </div>

        <div className="gauge-item">
            <Gauge key={1} value = {30} min = {0}  max = {100} label = 'Humedad' units = '%' colorMin = "#b7d8f9" colorMax = "#0077ee" />
            <Link to="/readings/Humedad" className="gauge-btn">Ver Detalles</Link>
        </div>

        <div className="gauge-item">
            <Gauge key={2} value = {30} min = {0}  max = {100} label = 'Monoxido(CO)' units = 'Particulas por Millon' colorMin = "#b0b0af" colorMax = "#303030" />
            <Link to="/readings/Monoxido" className="gauge-btn">Ver Detalles</Link>
        </div>

        <div className="gauge-item">
            <Gauge key={3} value = {30} min = {0}  max = {100} label = 'Alcohol' units = 'Particulas por Millon' colorMin = "#ffdcfd" colorMax = "#ff05f1" />
            <Link to="/readings/Alcohol" className="gauge-btn">Ver Detalles</Link>
        </div>

        <div className="gauge-item">
            <Gauge key={4} value = {100} min = {0}  max = {100} label = 'Metano' units = 'Particulas por Millon' colorMin = "#fdc4c4" colorMax = "#ff0000" />
            <Link to="/readings/Metano" className="gauge-btn">Ver Detalles</Link>
        </div>

        <div className="gauge-item">
            <Gauge key={5} value = {90} min = {0}  max = {100} label = 'Butano' units = 'Particulas por Millon' colorMin = "#03fffb" colorMax = "#068080" />
            <Link to="/readings/Butano" className="gauge-btn">Ver Detalles</Link>
        </div>
        
    </div>
    )
}

export default Home;