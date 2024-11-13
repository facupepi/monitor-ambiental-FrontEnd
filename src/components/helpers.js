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
            max = 2000;
            break;
        case 'h2':
            formattedType = 'Hidrógeno (H2)';
            units = 'ppm';
            min = 0;
            max = 5000;
            break;
        case 'lpg':
            formattedType = 'Gas Licuado de Petróleo (LPG)';
            units = 'ppm';
            min = 0;
            max = 5000;
            break;
        case 'alcohol':
            formattedType = 'Alcohol';
            units = 'ppm';
            min = 0;
            max = 2000;
            break;
        case 'ch4':
            formattedType = 'Metano';
            units = 'ppm';
            min = 0;
            max = 20000;
            break;
        case 'propane':
            formattedType = 'Propano';
            units = 'ppm';
            min = 0;
            max = 5000;
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

    return {formattedType, units, min, max};
};
// Gas Levels Constants for CO
const co = [
    {
        value: "50",
        effects: "Dolor de cabeza leve después de 2-3 horas."
    },
    {
        value: "400",
        effects: "Dolor de cabeza fuerte y náuseas en 1-2 horas, posible desmayo."
    },
    {
        value: "800",
        effects: "Mareos, náuseas, y riesgo de desmayo en 45 minutos; peligro de muerte en 2-3 horas."
    },
    {
        value: ">1600",
        effects: "Riesgo elevado de muerte; efectos graves y potencialmente mortales en pocos minutos."
    }
];

const h2 = [
    {
        value: "0-400",
        effects: "Nivel seguro, sin efectos adversos en la salud."
    }, {
        value: "400-1000",
        effects: "Baja concentración; seguro en períodos cortos; precaución en ambientes cerrados."
    }, {
        value: "1000-4000",
        effects: "Precaución, exposición prolongada puede causar dolor de cabeza y molestias."
    }, {
        value: "4000-5000",
        effects: "Riesgo leve de inflamabilidad; en concentraciones mayores se incrementa el riesgo de explosión."
    }
];

const alcohol = [
    {
        value: "0-200",
        effects: "Nivel seguro, sin efectos adversos significativos."
    }, {
        value: "200-500",
        effects: "Baja concentración; efectos mínimos o nulos, puede causar leve irritación en algunas personas."
    }, {
        value: "500-1000",
        effects: "Puede causar irritación leve de los ojos, nariz, y garganta en exposiciones prolongadas."
    }, {
        value: "1000-1500",
        effects: "Riesgo de efectos leves en el sistema nervioso, como mareo o dolor de cabeza tras exposición prolongada."
    }, {
        value: "1500-2000",
        effects: "Efectos notables, como mareos, náuseas, y dolor de cabeza en exposiciones cortas; precaución recomendada."
    }
];

const lpg = [
    {
        value: "0-1000",
        effects: "Nivel seguro, sin efectos adversos significativos."
    }, {
        value: "1000-2000",
        effects: "Baja concentración; puede causar irritación leve en ambientes cerrados."
    }, {
        value: "2000-3000",
        effects: "Irritación en ojos y vías respiratorias; efectos leves como mareos con exposición prolongada."
    }, {
        value: "3000-4000",
        effects: "Somnolencia, mareos, y dolor de cabeza con exposiciones cortas; precaución recomendada."
    }, {
        value: "4000-5000",
        effects: "Riesgo alto de efectos graves como somnolencia intensa y mareos; riesgo de inflamabilidad en espacios sin ventilación."
    }
];

const ch4 = [
    {
        value: "0-5000",
        effects: "Nivel seguro en áreas bien ventiladas, sin efectos adversos significativos."
    }, {
        value: "5000-10000",
        effects: "Precaución en espacios cerrados; puede causar ligera somnolencia con exposición prolongada."
    }, {
        value: "10000-15000",
        effects: "Puede causar mareos, dolor de cabeza y náuseas; riesgo de inflamabilidad en ambientes cerrados."
    }, {
        value: "15000-20000",
        effects: "Alta concentración; riesgo de efectos graves como confusión y pérdida de coordinación; peligro de explosión."
    }
];

const propane = [
    {
        value: "0-1000",
        effects: "Nivel seguro, sin efectos adversos significativos."
    }, {
        value: "1000-2000",
        effects: "Baja concentración; puede causar irritación leve en espacios cerrados."
    }, {
        value: "2000-3000",
        effects: "Irritación en los ojos, nariz y garganta; efectos leves como mareos si se inhala por períodos prolongados."
    }, {
        value: "3000-4000",
        effects: "Riesgo de somnolencia, mareos, dolor de cabeza en exposiciones prolongadas; precaución recomendada."
    }, {
        value: "4000-5000",
        effects: "Alto riesgo de efectos graves como somnolencia intensa, mareos y náuseas; riesgo de inflamabilidad en ambientes cerrados."
    }
];

// Datos para los rangos de temperatura y humedad relativa
const temperature = [
    { value: "-10°C a 0°C", effects: "Congelación de agua, sensación de frío extremo." },
    { value: "1°C a 10°C", effects: "Frío incómodo, riesgo para la salud si se está expuesto por mucho tiempo." },
    { value: "11°C a 30°C", effects: "Temperatura cómoda, ambiente agradable." },
    { value: "31°C a 40°C", effects: "Calor incómodo, riesgo de agotamiento por calor." },
    { value: "41°C a 50°C", effects: "Calor extremo, riesgo de golpe de calor." },
  ];
  
  const humidity = [
    { value: "0% a 20%", effects: "Ambiente muy seco, puede causar irritación en la piel y ojos." },
    { value: "21% a 40%", effects: "Ambiente seco, puede causar incomodidad en vías respiratorias." },
    { value: "41% a 60%", effects: "Nivel de humedad cómodo, sin riesgo para la salud." },
    { value: "61% a 80%", effects: "Ambiente algo húmedo, puede generar incomodidad en zonas cálidas." },
    { value: "81% a 100%", effects: "Ambiente muy húmedo, puede causar malestar y aumentar el riesgo de enfermedades respiratorias." },
  ];

export {
    formatTypeAndUnit,
    co,
    h2,
    alcohol,
    lpg,
    ch4,
    propane,
    temperature,
    humidity
};