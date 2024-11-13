import React from 'react';
import '../../App.css'; // Asegúrate de incluir el archivo CSS

const GasLevelsTable = ({ levels, unit }) => {
    return (
        <div className="table-container">

            <table className="gas-levels-table">
                <thead>
                    <tr>
                        <th>({unit})</th>
                        <th>Efectos en la salud / Seguridad</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level, index) => (
                        <tr key={index}>
                            <td>{level.value}</td>
                            <td>{level.effects}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GasLevelsTable;
