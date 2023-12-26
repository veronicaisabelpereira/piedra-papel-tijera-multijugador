"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express = require("express");
require("dotenv/config");
const cors = require("cors");
const path = require("path");
// Importa nanoid de manera que debería ser compatible con CommonJS
const nanoid = require("nanoid").customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 21);
// ...
// ...
const app = express();
const PORT = process.env.PORT || 3000;
//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));
//
//Referencia a la base de datos
const usersCollection = db_1.firestore.collection("users");
const roomsCollection = db_1.firestore.collection("rooms");
//ENDPOINTS
//AUTH
app.post("/auth", async (req, res) => {
    const { fullname } = req.body;
    try {
        usersCollection
            .where("fullname", "==", fullname)
            .get()
            .then((searchResponse) => {
            if (searchResponse.empty) {
                const fullUserId = nanoid();
                const userId = fullUserId.slice(16);
                usersCollection
                    .doc(userId.toString())
                    .set({ fullname: fullname, fullUserId: fullUserId })
                    .then(() => {
                    res.json({ id: userId.toString() });
                });
            }
            else {
                res.json({
                    id: searchResponse.docs[0].id,
                });
            }
        });
    }
    catch (error) {
        // Manejar errores de importación
        console.error("Error importing nanoid:", error);
        res.status(500).send("Internal Server Error");
    }
});
//ROOMS
app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            const roomRef = db_1.rtdb.ref("rooms/" + nanoid());
            roomRef
                .set({
                owner: userId,
            })
                .then(() => {
                const fullRoomId = roomRef.key;
                const roomId = fullRoomId.slice(16).toUpperCase();
                roomsCollection
                    .doc(roomId.toString())
                    .set({ rtdbRoomId: fullRoomId })
                    .then(() => {
                    res.json({
                        id: roomId.toString(),
                        fullId: fullRoomId.toString(),
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "doesn't exist",
            });
        }
    });
});
//CARGA DATA DE CHAT
app.post("/rtdb-data", async (req, res) => {
    const { rtdbRoomId, userId, fullname, online, start, move } = req.body;
    // Verifica que todas las propiedades necesarias estén definidas
    if (rtdbRoomId === undefined ||
        userId === undefined ||
        fullname === undefined ||
        online === undefined ||
        start === undefined ||
        move === undefined) {
        return res.status(400).json({ error: "1-Missing required data" });
    }
    /*Crea una referencia a una ubicación específica en la base de datos en tiempo real de Firebase.
    La ubicación está determinada por la variable rtdbRoomId y apunta al nodo "currentGame" bajo el nodo "rooms". */
    const userDataRef = db_1.rtdb.ref(`rooms/${rtdbRoomId}/currentGame`);
    try {
        /*once("value") se utiliza para leer una vez los datos de la ubicación especificada por userDataRef.
        Esto devuelve una instantánea (snapshot) de los datos en ese momento. */
        const snapshot = await userDataRef.once("value");
        //Asigna el número de hijos en una instantánea de datos a la variable numChildren.
        const numChildren = snapshot.numChildren();
        const data = snapshot.val();
        if (numChildren < 2 || data[userId]) {
            // Verifica que las propiedades requeridas no sean undefined antes de establecer los datos
            if (fullname !== undefined &&
                start !== undefined &&
                online !== undefined &&
                move !== undefined) {
                userDataRef.child(userId).set({
                    fullname: fullname,
                    start: start,
                    online: online,
                    move: move,
                });
                return res.json({ message: "Player data added or updated" });
            }
            else {
                return res.status(400).json({ error: "Missing required player data" });
            }
        }
        else {
            return res.status(403).json({ error: "Room is full" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
//HISTORY
app.post("/history", (req, res) => {
    const { rtdbRoomId } = req.body;
    const { result } = req.body;
    const historyRef = db_1.rtdb.ref(`rooms/${rtdbRoomId}/history`);
    historyRef.push({ result: result }).then((r) => res.json(r));
});
//ROOM/:roomId
app.get("/room/:roomId", async function (req, res) {
    const { roomId } = req.params;
    const roomDoc = await roomsCollection.doc(roomId.toString()).get();
    if (!roomDoc.exists) {
        res.status(404).json({ error: "Room not found" });
    }
    else {
        const roomData = roomDoc.data();
        res.status(200).json({ rtdbRoomId: roomData?.rtdbRoomId });
    }
});
//METDDOS PARA BORRAR ROOMS Y USERS
app.delete("/remove-room", (req, res) => {
    const { roomId } = req.body;
    roomsCollection
        .doc(roomId.toString())
        .delete()
        .then(() => {
        res.json("Document successfully deleted!");
    })
        .catch((error) => {
        res.json("Error removing document");
    });
});
app.delete("/remove-user", (req, res) => {
    const { userId } = req.body;
    usersCollection
        .doc(userId.toString())
        .delete()
        .then(() => {
        res.json("Document successfully deleted!");
    })
        .catch((error) => {
        res.json("Error removing document");
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
//Inicia el servidor y escucha en el puerto especificado. Cuando se recibe una solicitud, registra un mensaje en la consola indicando que el servidor ha sido iniciado y proporciona la URL donde se puede acceder.
app.listen(PORT, () => {
    console.log(`iniciado en http://localhost:${PORT}`);
});
