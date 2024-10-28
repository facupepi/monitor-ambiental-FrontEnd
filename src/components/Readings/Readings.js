import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Readings = () => {
    const { id, name, location, type } = useParams();
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState('');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const getUnit = (type) => {
        switch (type.toLowerCase()) {
            case 'co':
                return 'ppm';
            case 'h2':
                return 'ppm';
            case 'lpg':
                return 'ppm';
            case 'alcohol':
                return 'ppm';
            case 'ch4':
                return 'ppm';
            case 'propane':
                return 'ppm';
            case 'temperature':
                return 'ºC';
            case 'humidity':
                return '%';
            default:
                return '';
        }
    };

    useEffect(() => {
        fetch(`https://monitor-de-gases-back.onrender.com/stations/${id}/measurement/${type}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const formattedData = result.map(item => ({
                    date: new Date(item.creation_date).toLocaleTimeString('es-AR', { hour12: false }),
                    value: item.value,
                    unit: getUnit(type)
                }));
                setData(formattedData);
                setUnit(getUnit(type));
            })
            .catch((error) => console.error(error));
    }, [id, type]);

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
        )
    }

    else return (
        <div>
            <h1>Lecturas de {type} para {name} en {location}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" reversed='true' />
                    <YAxis dataKey="value" unit={unit} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Readings;