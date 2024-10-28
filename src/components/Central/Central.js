import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import Gauge from '../Gauge/Gauge';

const Central = () => {
    const { id, name, location } = useParams();
    const [measurements, setMeasurements] = useState([]);
    const [date, setDate] = useState('');

    const requestOptions = useMemo(() => ({
        method: "GET",
        redirect: "follow"
    }), []);

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const getSimilarColors = useCallback(() => {
        const baseColor = `hsl(${getRandomInt(0, 360)}, ${getRandomInt(50, 100)}%, ${getRandomInt(40, 60)}%)`;
        const similarColor = `hsl(${getRandomInt(0, 360)}, ${getRandomInt(50, 100)}%, ${getRandomInt(20, 40)}%)`;
        return [baseColor, similarColor];
    }, []);

    const formatMeasurement = useCallback((measurement) => {
        let formattedType = measurement.key;
        let units = '';
        let min = 0;
        let max = 100;

        switch (formattedType.toLowerCase()) {
            case 'co':
                formattedType = 'Monóxido de Carbono (CO)';
                units = 'ppm';
                min = 0;
                max = 50;
                break;
            case 'h2':
                formattedType = 'Hidrógeno (H2)';
                units = 'ppm';
                min = 0;
                max = 1000;
                break;
            case 'lpg':
                formattedType = 'Gas Licuado de Petróleo (LPG)';
                units = 'ppm';
                min = 0;
                max = 1000;
                break;
            case 'alcohol':
                formattedType = 'Alcohol';
                units = 'ppm';
                min = 0;
                max = 500;
                break;
            case 'ch4':
                formattedType = 'Metano';
                units = 'ppm';
                min = 0;
                max = 500;
                break;
            case 'propane':
                formattedType = 'Propano';
                units = 'ppm';
                min = 0;
                max = 1000;
                break;
            case 'temperature':
                formattedType = 'Temperatura';
                units = 'ºC';
                min = -10;
                max = 50;
                break;
            case 'humidity':
                formattedType = 'Humedad';
                units = '%';
                min = 0;
                max = 100;
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
            key: measurement.key
        };
    }, [getSimilarColors]);

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://monitor-de-gases-back.onrender.com/stations?limit=1&measurements=true`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const central = data.find(central => central.id === id);
                        if (central) {
                            const filteredMeasurements = [];

                            Object.keys(central).forEach(key => {
                                if (Array.isArray(central[key])) {
                                    central[key].forEach(measurement => {
                                        filteredMeasurements.push(formatMeasurement({ ...measurement, key }));
                                    });
                                }
                            });
                            const dateNow = new Date().toLocaleString("es-AR", {
                                timeZone: "America/Argentina/Buenos_Aires",
                                hour12: false
                            });
                            setDate(dateNow);
                            setMeasurements(filteredMeasurements);
                        }
                    }
                })
                .catch(error => console.error(error));
        };

        fetchData();
        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
    }, [id, requestOptions, formatMeasurement]);

    if (measurements.length === 0) {
        return (
            <div className='loader-container'>
                <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="central-container">
                <h1>{name}</h1>
                <div>
                    <p><strong>Última actualización:</strong> {date}</p>
                    <p><strong>Ubicación:</strong> {location}</p>
                </div>

                <div className="container">
                    {measurements.map((measurement) => (
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
                            <Link
                                to={`/central/${id}/${name}/${location}/readings/${measurement.key}`}
                                className="btn"
                            >
                                Ver Detalles
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Central;
