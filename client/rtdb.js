"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
//inicializamos
const firebaseConfig = {
    apiKey: "vHxims5eUHRi2vveqjumWj8hK8Yziilk6TeO48F4",
    databaseURL: "https://apx-2-ada91-default-rtdb.firebaseio.com/",
    authDomain: "apx-dwf-m6.firebaseapp.com",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const rtdb = (0, database_1.getDatabase)(app);
exports.rtdb = rtdb;
/*
Este fragmento de código importa dos funciones, initializeApp y getDatabase,
desde los módulos firebase/app y firebase/database, respectivamente.
Luego inicializa una aplicación de Firebase utilizando el objeto de configuración proporcionado firebaseConfig y obtiene la instancia de la base de datos en tiempo real utilizando la aplicación inicializada. Por último, exporta la variable rtdb, que representa la base de datos en tiempo real, para su uso en otras partes del código.

*/
/**DIFERENCIAS ENTRE EL RTDB EN EL CLIENTE Y EL DB EN EL BACKEND
 El primer fragmento de código utiliza el Firebase Admin SDK, que está diseñado para ser utilizado en el backend de la aplicación. Permite acceder a características avanzadas de Firebase, como Firestore y Realtime Database, desde el servidor.

El segundo fragmento de código utiliza la biblioteca Firebase Web SDK, que está diseñada para ser utilizada en el cliente (en el navegador). Esta biblioteca proporciona acceso a características de Firebase, como la base de datos en tiempo real (Realtime Database) desde el lado del cliente.

En resumen, la diferencia radica en el contexto de uso: el primer código está destinado al backend, mientras que el segundo código está destinado al cliente. Además, el primer código utiliza el Firebase Admin SDK, que proporciona más funcionalidades avanzadas, mientras que el segundo código utiliza el Firebase Web SDK, que está más enfocado en las funcionalidades del lado del cliente.
 */
/*
    QUE ES UN SDK
   SDK significa "Software Development Kit" (Kit de Desarrollo de Software, en español). Un SDK es un conjunto de herramientas, bibliotecas y documentación que facilita el desarrollo de software para una plataforma en particular. Proporciona a los desarrolladores las herramientas necesarias para crear, probar e integrar aplicaciones con un servicio o plataforma específica.

En el contexto de Firebase, el SDK (Firebase SDK) es un conjunto de bibliotecas y herramientas que permiten a los desarrolladores interactuar con los servicios de Firebase desde sus aplicaciones. Proporciona funciones y métodos predefinidos para acceder a características como la autenticación de usuarios, la base de datos en tiempo real, el almacenamiento en la nube, las notificaciones push, entre otros.

*/
