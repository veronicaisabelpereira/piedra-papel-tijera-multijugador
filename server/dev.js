"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
require("./index");
/*
Este código importa el módulo dotenv y lo utiliza para cargar las variables de entorno desde un archivo .env. Luego, importa el archivo index.

El módulo dotenv es comúnmente utilizado en aplicaciones Node.js para cargar variables de entorno desde un archivo .env. Estas variables de entorno suelen contener información sensible como claves de API, credenciales de bases de datos, etc. Al cargar estas variables desde un archivo .env, se evita que esta información sensible esté expuesta en el código fuente de la aplicación.

El archivo index que se importa después podría ser el punto de entrada principal de la aplicación, donde se inicia el servidor o se configuran otras partes de la aplicación.



*/
