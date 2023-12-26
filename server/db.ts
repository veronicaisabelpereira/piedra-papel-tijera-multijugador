/*
Desde aca inicializamos, nos vinculamos con nuestra base de datos

*/

import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-2-ada91-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };

/*
Este fragmento de código inicializa el Firebase Admin SDK en un archivo TypeScript. 
Importa los módulos necesarios, inicializa el SDK utilizando una clave de cuenta de servicio y establece la URL de la base de datos. Luego crea referencias a los servicios Firestore y Realtime Database y los exporta para usar en otras partes del código.
 //
  El SDK de Firebase Admin es una biblioteca que proporciona acceso directo al backend de Firebase desde un entorno de servidor. Permite realizar operaciones avanzadas en la base de datos, autenticación de usuarios, envío de notificaciones push y más. En este caso, el código está utilizando el SDK de Firebase Admin para acceder a los servicios de Firestore y Realtime Database.

*/
