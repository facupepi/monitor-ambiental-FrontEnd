import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Gauge from '../Gauge/Gauge'; // Asegúrate de importar el componente Gauge correctamente

const Central = () => {
    const { id, name, location } = useParams();
    const [measurements, setMeasurements] = useState([]);

    const [date, setDate] = useState('');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const getSimilarColors = () => {
        const baseColor = `hsl(${getRandomInt(0, 360)}, ${getRandomInt(50, 100)}%, ${getRandomInt(40, 60)}%)`;
        const similarColor = `hsl(${getRandomInt(0, 360)}, ${getRandomInt(50, 100)}%, ${getRandomInt(20, 40)}%)`;
        return [baseColor, similarColor];
    };

    const formatMeasurement = (measurement) => {
        let formattedType = measurement.key;
        let units = '';
        let min = 0;
        let max = 100;
        let key = measurement.key;

        switch (formattedType.toLowerCase()) {
            case 'co':
                formattedType = 'Monóxido de Carbono (CO)';
                units = 'ppm';
                min = 0;
                max = 50; // Valores típicos de seguridad para CO
                break;
            case 'h2':
                formattedType = 'Hidrógeno (H2)';
                units = 'ppm';
                min = 0;
                max = 1000; // Valores típicos para H2
                break;
            case 'lpg':
                formattedType = 'Gas Licuado de Petróleo (LPG)';
                units = 'ppm';
                min = 0;
                max = 1000; // Valores típicos para LPG
                break;
            case 'alcohol':
                formattedType = 'Alcohol';
                units = 'ppm';
                min = 0;
                max = 500; // Valores típicos para alcohol
                break;
            case 'ch4':
                formattedType = 'Metano';
                units = 'ppm';
                min = 0;
                max = 500; // Valores típicos para alcohol
                break;
            case 'propane':
                formattedType = 'Propano';
                units = 'ppm';
                min = 0;
                max = 1000; // Valores típicos para propano
                break;
            case 'temperature':
                formattedType = 'Temperatura';
                units = 'ºC';
                min = -10;
                max = 50; // Rango típico de temperatura
                break;
            case 'humidity':
                formattedType = 'Humedad';
                units = '%';
                min = 0;
                max = 100; // Rango típico de humedad
                break;
            default:
                units = '';
        }

        const [colorMin, colorMax] = getSimilarColors();

        return {
            type: formattedType,
            value: parseFloat(parseFloat(measurement.value).toFixed(2)),
            date: measurement.creation_date,
            units: units,
            colorMin: colorMin,
            colorMax: colorMax,
            min: min,
            max: max,
            key: key
        };
    };

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://monitor-de-gases-back.onrender.com/stations?limit=1&measurements=true`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const central = data.find(central => central.id === id);
                        if (central) {
                            const filteredMeasurements = [];

                            // Iterar sobre los tipos de mediciones de la central específica
                            Object.keys(central).forEach(key => {
                                if (Array.isArray(central[key])) {
                                    central[key].forEach(measurement => {
                                        filteredMeasurements.push(formatMeasurement({ ...measurement, key }));
                                    });
                                }
                            });
                            let dateNow = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" , hour12: false});
                            setDate(dateNow)
                            setMeasurements(filteredMeasurements);
                        }
                    }
                })
                .catch(error => console.error(error));
        };

        fetchData(); // Fetch data initially
        const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [id]);

    return (
        <div className="container">
            <div className="central-container">
                <h1>{name}</h1>
                {
                    measurements.length > 0 ? 
                        <div>
                            <p>Última actualización: {date}</p> 
                            <p>Ubicación: {location}</p>
                        </div>
                    : null
                }

                <div className="container">
                    {
                        measurements.length > 0 ?
                        measurements.map((measurement) => (
                            <div key={measurement.type} className="item">
                                <Gauge 
                                    key={measurement.type} 
                                    value={measurement.value} 
                                    min={measurement.min} 
                                    max={measurement.max} 
                                    label={measurement.type} 
                                    units={measurement.units} 
                                    colorMin={measurement.colorMin} 
                                    colorMax={measurement.colorMax} 
                                />
                                <Link to={`/central/${id}/${name}/${location}/readings/${measurement.key}`} className="btn">Ver Detalles</Link>
                            </div>
                        ))
                        : <p>Cargando información de la central...</p>
                    }
                </div>            
            </div>
        </div>
    );
}

export default Central;