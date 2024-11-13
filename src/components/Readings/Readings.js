import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';
import { API_URL, formatTypeAndUnit } from '../helpers';
import GasLevelsTable from '../GasLevelsTable/GasLevelsTable';

import {
    co,
    h2,
    alcohol,
    lpg,
    ch4,
    propane,
    temperature,
    humidity
} from '../helpers';

// Datos de concentración de gas
const gasLevels = {
    co,
    h2,
    alcohol,
    lpg,
    ch4,
    propane,
    temperature,
    humidity
};

const Readings = () => {
    const { id, name, location, type } = useParams();
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState('');
    const [formattedType, setFormattedType] = useState('');
    const [yDomain, setYDomain] = useState([0, 1000]); // Rango por defecto
    const [loading, setLoading] = useState(true);

    const requestOptions = useMemo(() => ({ method: "GET", redirect: "follow" }), []);

    useEffect(() => {
        const { formattedType, units } = formatTypeAndUnit(type);
        setFormattedType(formattedType);
        setUnit(units);

        fetch(`${API_URL}/stations/${id}/measurement/${type}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const now = new Date();
                const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

                const filteredData = result.filter(item => {
                    const itemDate = new Date(item.creation_date);
                    return itemDate >= threeHoursAgo;
                });

                const formattedData = filteredData.map(item => ({
                    date: new Date(item.creation_date).toLocaleTimeString('es-AR', { hour12: false }),
                    value: item.value,
                    unit: units
                }));

                // Establecer los valores mínimos y máximos para Y
                const values = formattedData.map(item => item.value);
                if (values.length > 0) {
                    const minValue = Math.min(...values);
                    const maxValue = Math.max(...values);
                    setYDomain([minValue, maxValue]);
                } else {
                    setYDomain([0, 1000]); // Rango por defecto si no hay valores
                }

                setData(formattedData);
                setLoading(false); // Finalizar la carga
            })
            .catch((error) => {
                console.error(error);
                setLoading(false); // Finalizar la carga en caso de error
            });
    }, [id, type, requestOptions]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Readings');

        // Generar el archivo
        XLSX.writeFile(workbook, `readings_${type}.xlsx`);
    };

    if (loading) {
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
            <div className="readings-content">
                <h1>Lecturas de {formattedType} para {name} en {location}</h1>
                <Button onClick={exportToExcel}>Exportar a Excel</Button>

                {/* Gráfica */}
                {data.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" reversed={true} />
                                <YAxis
                                    domain={yDomain}  // Usar el dominio dinámico de Y
                                    unit={unit}
                                />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="no-data-message">No hay datos disponibles en las últimas 3 horas.</p>
                )}
            </div>
            <div className="table-container">
                <GasLevelsTable levels={gasLevels[type]} unit={unit} gasName={formattedType} />
            </div>
        </div>
    );
};

export default Readings;