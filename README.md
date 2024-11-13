# FrontEnd - APP Web React

La aplicación web para el monitoreo de gases y condiciones ambientales está construida utilizando **React**, una de las bibliotecas de JavaScript más populares para crear interfaces de usuario dinámicas y reactivas. Para optimizar el proceso de desarrollo, utilizamos **Vite.js** como herramienta de construcción. Esto permite una experiencia de desarrollo más rápida y eficiente gracias a un servidor optimizado y la carga de módulos en tiempo real.

La aplicación está diseñada como una **SPA (Single Page Application)**, lo que significa que carga una única página HTML en el navegador. A medida que el usuario interactúa, el contenido se actualiza dinámicamente en esa misma página, sin necesidad de recargar toda la página. Esto mejora considerablemente la velocidad de la aplicación, brindando una experiencia de usuario más fluida y similar a la de una aplicación de escritorio, y optimizando su funcionamiento tanto en dispositivos de escritorio como móviles.

### Características Principales

- **Monitoreo en tiempo real**: Visualiza las lecturas de gases, temperatura y humedad en tiempo real.
- **Historial de lecturas**: Accede a gráficos que muestran los niveles históricos de los parámetros monitoreados.
- **Exportación de datos**: Exporta los registros de lecturas en formato Excel para su análisis fuera de la aplicación.

### Despliegue en Netlify

La aplicación está desplegada en **Netlify**, una plataforma que facilita el alojamiento y despliegue de aplicaciones web estáticas. Con Netlify, la implementación continua, la optimización automática y la integración con GitHub permiten una administración eficiente del flujo de trabajo, garantizando que cualquier cambio en el código se refleje inmediatamente en el entorno de producción.

### Documentación y Recursos

- [Documentación Oficial de React](https://reactjs.org/docs/getting-started.html)
- [Documentación Oficial de Netlify](https://docs.netlify.com/)
- [Aplicación Web Monitor Ambiental](https://monitor-ambiental.netlify.app)

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm start`

Inicia la aplicación en modo desarrollo. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en acción. Los cambios realizados en el código se reflejarán automáticamente sin necesidad de recargar la página.

### `npm run build`

Genera una versión optimizada de la aplicación para producción en la carpeta `build`. Este comando asegura que la aplicación esté lista para ser desplegada en un servidor de producción, con el mejor rendimiento posible.

### `npm test`

Ejecuta el conjunto de pruebas configurado en el proyecto para asegurarse de que las funcionalidades de la aplicación estén funcionando correctamente.
