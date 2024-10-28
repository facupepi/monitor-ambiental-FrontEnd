import React from 'react';

function About() {
    return (
        <div>
            <h1>Acerca De</h1>
            <p>
                La presencia de gases peligrosos en entornos domésticos e industriales representa un riesgo significativo para la salud y seguridad de las personas. Gases como el monóxido de carbono (CO), hidrógeno (H₂), propano, gas licuado de petróleo (LPG), metano (CH₄), y vapores de alcohol pueden estar presentes en concentraciones que, aunque imperceptibles al sentido humano, resultan tóxicas o inflamables.
            </p>
            <p>
                El monóxido de carbono, en particular, es un gas incoloro e inodoro que se produce por una combustión incompleta de combustibles fósiles, como gas natural, gasolina y madera. Su acumulación en espacios cerrados, como viviendas mal ventiladas, puede causar intoxicación, asfixia e incluso la muerte. Por otro lado, el gas natural, compuesto principalmente de metano y otros hidrocarburos como el butano, es ampliamente utilizado en hogares y en entornos industriales para calefacción y cocción. Las fallas en equipos o una ventilación inadecuada en el sistema de combustión pueden originar fugas, representando un riesgo de incendio o explosión.
            </p>
            <p>
                Además de los gases peligrosos, la temperatura y la humedad del ambiente pueden influir en la combustión y, por ende, en la producción de estos gases tóxicos. Nuestro sistema incluye sensores inalámbricos para medir monóxido de carbono, hidrógeno, propano, LPG, metano, humo, y vapores de alcohol, además de sensores de temperatura y humedad para monitorear el entorno en tiempo real y advertir cuando las condiciones superen los límites seguros.
            </p>
            <h2>Tecnología del Sistema</h2>
            <p>
                El sistema de monitoreo se basa en sensores conectados a un microcontrolador que transmite los datos a través de WiFi hacia la nube, almacenándose en una base de datos en Firebase Realtime Database. Nuestra <strong>API alojada en Render</strong> actúa como un puente para que los datos de los sensores puedan ser fácilmente accesibles desde cualquier aplicación cliente, como la interfaz web o aplicaciones móviles.
            </p>
            <h2>Funcionalidades Clave</h2>
            <ul>
                <li>
                    <strong>Monitoreo de Gases Peligrosos:</strong> Detecta niveles inseguros de monóxido de carbono, hidrógeno, propano, LPG, metano, humo y alcohol.
                </li>
                <li>
                    <strong>Monitoreo Ambiental:</strong> Registra la temperatura y la humedad para entender el entorno en el que se detectan los gases.
                </li>
                <li>
                    <strong>Alertas en Tiempo Real:</strong> Envía alertas inmediatas a los dispositivos móviles cuando se superan los umbrales de seguridad, permitiendo una respuesta rápida.
                </li>
                <li>
                    <strong>Interfaz Web Interactiva:</strong> Una aplicación web creada con React permite a los usuarios visualizar los datos de manera intuitiva y recibir notificaciones sobre el estado actual del entorno.
                </li>
            </ul>
            <p>
                En conjunto, este proyecto ofrece una solución tecnológica que no solo mide y alerta sobre la presencia de gases peligrosos, sino que también contribuye al confort y seguridad de los hogares e instalaciones industriales, permitiendo prevenir riesgos y promover un ambiente más seguro.
            </p>
        </div>
    );
}

export default About;
