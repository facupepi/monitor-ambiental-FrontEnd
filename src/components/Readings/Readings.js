import React from "react";
import { useParams } from "react-router-dom";

// El objeto con la información estática
const readingsInfo = {
    Temperatura: {
        label: 'Temperatura',
        description: 'La temperatura es una medida del calor. Se mide en grados Celsius (ºC).',
        minValue: '0 ºC',
        maxValue: '100 ºC',
        safeRange: '10 ºC - 30 ºC',
    },
    Humedad: {
        label: 'Humedad Relativa',
        description: 'La humedad relativa es la cantidad de vapor de agua en el aire en comparación con la cantidad total que el aire puede contener.',
        minValue: '0 %',
        maxValue: '100 %',
        safeRange: '30 % - 60 %',
    },
    Monoxido: {
        label: 'Monóxido de Carbono',
        description: 'El monóxido de carbono (CO) es un gas inodoro y peligroso que puede causar intoxicación.',
        minValue: '0 PPM',
        maxValue: '100 PPM',
        safeRange: '0 PPM - 9 PPM',
    },
    Alcohol: {
        label: 'Alcohol',
        description: 'El sensor de alcohol mide las partículas de alcohol en el aire.',
        minValue: '0 PPM',
        maxValue: '500 PPM',
        safeRange: '0 PPM - 200 PPM',
    },
    Metano: {
        label: 'Metano',
        description: 'El metano (CH₄) es un gas inflamable que puede ser peligroso en altas concentraciones.',
        minValue: '0 PPM',
        maxValue: '1000 PPM',
        safeRange: '0 PPM - 200 PPM',
    },
    Butano: {
        label: 'Butano',
        description: 'El butano es un gas inflamable que se utiliza en estufas y encendedores.',
        minValue: '0 PPM',
        maxValue: '1000 PPM',
        safeRange: '0 PPM - 300 PPM',
    },
};

function Readings() {
    const { name } = useParams();

    // Buscar la información de la lectura
    const reading = readingsInfo[name];

    // Si no hay información para el parámetro dado, mostramos un mensaje de error
    if (!reading) return <div> <h1>Información no disponible para {name}</h1> </div>;

    return (
        <div>
            <h1>{reading.label}</h1>
            <p>{reading.description}</p>
            <p><strong>Valor mínimo:</strong> {reading.minValue}</p>
            <p><strong>Valor máximo:</strong> {reading.maxValue}</p>
            <p><strong>Rango seguro:</strong> {reading.safeRange}</p>
        </div>
    );
}

export default Readings;
