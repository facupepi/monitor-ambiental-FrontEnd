import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Readings = () => {
    const { id, name, location, type } = useParams();
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState('');

    // Utilizamos useMemo para memorizar requestOptions
    const requestOptions = useMemo(() => ({
        method: "GET",
        redirect: "follow"
    }), []);

    // También utilizamos useMemo para getUnit de manera que esté disponible solo cuando type cambia
    const unitMemo = useMemo(() => {
        switch (type.toLowerCase()) {
            case 'co':
            case 'h2':
            case 'lpg':
            case 'alcohol':
            case 'ch4':
            case 'propane':
                return 'ppm';
            case 'temperature':
                return 'ºC';
            case 'humidity':
                return '%';
            default:
                return '';
        }
    }, [type]);

    useEffect(() => {
        fetch(`https://monitor-de-gases-back.onrender.com/stations/${id}/measurement/${type}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const formattedData = result.map(item => ({
                    date: new Date(item.creation_date).toLocaleTimeString('es-AR', { hour12: false }),
                    value: item.value,
                    unit: unitMemo
                }));
                setData(formattedData);
                setUnit(unitMemo);
            })
            .catch((error) => console.error(error));
    }, [id, type, requestOptions, unitMemo]);

    if (data.length === 0) {
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
        <div>
            <h1>Lecturas de {type} para {name} en {location}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" reversed={true} />
                    <YAxis dataKey="value" unit={unit} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Readings;
