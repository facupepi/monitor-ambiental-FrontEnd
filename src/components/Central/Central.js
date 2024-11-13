import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import Gauge from '../Gauge/Gauge';
import { formatTypeAndUnit } from '../helpers';

const Central = () => {
    const { id, name, location } = useParams();
    const [measurements, setMeasurements] = useState([]);
    const [previousMeasurements, setPreviousMeasurements] = useState({});
    const [date, setDate] = useState('');
    const [gaugeColors, setGaugeColors] = useState({});

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
        let type = measurement.key;

        const { formattedType, units, min, max } = formatTypeAndUnit(type);

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

                            // Actualizar el estado de las mediciones anteriores y el color del gauge si cambia el valor
                            setPreviousMeasurements(prev => {
                                const newPreviousMeasurements = { ...prev };
                                const newGaugeColors = { ...gaugeColors };

                                filteredMeasurements.forEach(measurement => {
                                    const previousValue = prev[measurement.key];
                                    newPreviousMeasurements[measurement.key] = measurement.value;

                                    if (previousValue !== measurement.value) {
                                        const [colorMin, colorMax] = getSimilarColors();
                                        newGaugeColors[measurement.key] = { colorMin, colorMax };
                                    }
                                });

                                setGaugeColors(newGaugeColors);
                                return newPreviousMeasurements;
                            });
                        }
                    }
                })
                .catch(error => console.error(error));
        };

        fetchData();
        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
    }, [id, requestOptions, formatMeasurement, gaugeColors]);

    const renderMeasurement = (measurement) => {
        const colors = gaugeColors[measurement.key] || { colorMin: measurement.colorMin, colorMax: measurement.colorMax };

        return (
            <div key={measurement.type} className="item">
                <Gauge
                    key={measurement.type}
                    value={measurement.value}
                    min={measurement.min}
                    max={measurement.max}
                    label={measurement.type}
                    units={measurement.units}
                    colorMin={colors.colorMin}
                    colorMax={colors.colorMax}
                />
                <Link
                    to={`/central/${id}/${name}/${location}/readings/${measurement.key}`}
                    className="btn"
                >
                    Ver Detalles
                </Link>
            </div>
        );
    };

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
                    {measurements.map((measurement) => renderMeasurement(measurement))}
                </div>
            </div>
        </div>
    );
};

export default Central;
