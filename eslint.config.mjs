// Importa el módulo 'globals', que proporciona configuraciones de variables globales para diferentes entornos (como navegador o Node.js).
import globals from "globals";

// Importa el plugin '@eslint/js', que contiene configuraciones recomendadas de ESLint para JavaScript.
import pluginJs from "@eslint/js";

// Importa el plugin 'eslint-plugin-react', que contiene configuraciones y reglas específicas para React en ESLint.
import pluginReact from "eslint-plugin-react";

// Exporta un arreglo con configuraciones de ESLint para distintos tipos de archivos y entornos.
export default [
  // Configuración para aplicar reglas ESLint a archivos con extensiones .js, .mjs, .cjs y .jsx.
  {files: ["**/*.{js,mjs,cjs,jsx}"]},

  // Configura ESLint para reconocer variables globales del entorno de navegador.
  {languageOptions: { globals: globals.browser }},

  // Aplica las configuraciones recomendadas de ESLint para JavaScript.
  pluginJs.configs.recommended,

  // Aplica las configuraciones recomendadas de ESLint para React.
  pluginReact.configs.flat.recommended,

  {
    rules: {
      "no-undef": "off"
    }
  }
];
