import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';

const Readings = () => {
    const { id, name, location, type } = useParams();
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState('');
    const [formattedType, setFormattedType] = useState('');

    const requestOptions = useMemo(() => ({
        method: "GET",
        redirect: "follow"
    }), []);

    const formatTypeAndUnit = (type) => {
        let formattedType = '';
        let units = '';
        let min = 0;
        let max = 100;

        switch (type.toLowerCase()) {
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

        return { formattedType, units, min, max };
    };

    useEffect(() => {
        const { formattedType, units } = formatTypeAndUnit(type);
        setFormattedType(formattedType);
        setUnit(units);

        fetch(`https://monitor-de-gases-back.onrender.com/stations/${id}/measurement/${type}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const formattedData = result.map(item => ({
                    date: new Date(item.creation_date).toLocaleTimeString('es-AR', { hour12: false }),
                    value: item.value,
                    unit: units
                }));
                setData(formattedData);
            })
            .catch((error) => console.error(error));
    }, [id, type, requestOptions]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Readings');

        // Generar el archivo
        XLSX.writeFile(workbook, `readings_${type}.xlsx`);
    };

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
        <div className='container-readings'>
            <h1>Lecturas de {formattedType} para {name} en {location}</h1>
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
            <Button onClick={exportToExcel}>Exportar a Excel</Button> {/* Botón para exportar */}
        </div>
    );
};

export default Readings;