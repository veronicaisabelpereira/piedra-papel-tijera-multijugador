"use strict";
/*
Sobre las importaciones:
onValue y ref son funciones utilizadas en la biblioteca Firebase para interactuar con la base de datos en tiempo real.
La función ref se utiliza para crear una referencia a un nodo específico en la base de datos.
Esta referencia se puede utilizar para leer, escribir o escuchar cambios en los datos de ese nodo.
Por otro lado, la función onValue se utiliza para suscribirse a los cambios en los datos de una referencia específica en la base de datos.
Cada vez que hay un cambio en los datos de la referencia,
se ejecuta una función de devolución de llamada proporcionada como argumento a onValue.
Esto permite que la aplicación reaccione y actualice la interfaz de usuario en función de los cambios en los datos en tiempo real.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const database_1 = require("firebase/database");
const rtdb_1 = require("./rtdb");
const lodash_1 = require("lodash");
const router_1 = require("@vaadin/router");
/*
Establece la variable API_BASE_URL en función del valor de la variable de entorno ENV.
Si ENV está configurada como "development", API_BASE_URL se establece en "http://localhost:3000".
Si ENV está configurada como "production", API_BASE_URL se establece en el valor de la variable de entorno BACKEND_URL.
*/
var API_BASE_URL = "";
if (process.env.ENV == "development") {
    API_BASE_URL = "http://localhost:3000";
}
else if (process.env.ENV == "production") {
    API_BASE_URL = process.env.BACKEND_URL;
}
exports.state = {
    data: {
        fullname: "",
        userId: "",
        roomId: "",
        rtdbRoomId: "",
        start: "",
        online: "",
        myMove: "",
        rtdbData: "",
        opponentId: "",
        history: [],
    },
    listeners: [],
    init() {
        const emptyData = {
            fullname: "",
            userId: "",
            roomId: "",
            rtdbRoomId: "",
            start: "",
            online: "",
            myMove: "",
            rtdbData: "",
            opponentId: "",
            history: [],
        };
        const localData = localStorage.getItem("saved-state");
        if (!localData) {
            return;
        }
        else if (location.pathname == "/main" || location.pathname == "/") {
            this.setState(emptyData);
        }
        else {
            this.setState(JSON.parse(localData));
        }
    },
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb(newState);
        }
        localStorage.setItem("saved-state", JSON.stringify(newState));
        console.log("State: ", newState);
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    setFullname(fullname) {
        const cs = this.getState();
        cs.fullname = fullname;
        this.setState(cs);
    },
    setRoomId(roomId) {
        const cs = this.getState();
        cs.roomId = roomId;
        this.setState(cs);
    },
    setOpponentId(opponentId) {
        const cs = this.getState();
        cs.opponentId = opponentId;
        this.setState(cs);
    },
    setOnline(state) {
        const cs = this.getState();
        cs.online = state;
        this.setState(cs);
    },
    setStart(state) {
        const cs = this.getState();
        cs.start = state;
        this.setState(cs);
    },
    async signIn(callback) {
        const cs = this.getState();
        await fetch(API_BASE_URL + "/auth", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ fullname: cs.fullname }),
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            cs.userId = data.id;
            this.setState(cs);
            if (callback) {
                callback();
            }
        });
    },
    async askNewRoom(callback) {
        const cs = this.getState();
        await fetch(API_BASE_URL + "/rooms", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ userId: cs.userId }),
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            cs.roomId = data.id;
            cs.rtdbRoomId = data.fullId;
            this.setState(cs);
            if (callback) {
                callback();
            }
        });
    },
    async getExistingRoom() {
        const cs = this.getState();
        const res = await fetch(API_BASE_URL + "/room/" + cs.roomId, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error();
        }
        const data = await res.json();
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
    },
    async setRTDBdata(callback) {
        const cs = this.getState();
        const res = await fetch(API_BASE_URL + "/rtdb-data", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                rtdbRoomId: cs.rtdbRoomId,
                userId: cs.userId,
                fullname: cs.fullname,
                online: cs.online,
                start: cs.start,
                move: cs.myMove,
            }),
        });
        if (!res.ok) {
            throw new Error();
        }
        await res.json();
        if (callback) {
            callback();
        }
        this.setState(cs);
    },
    /*
  Obtiene el estado actual utilizando this.getState().
  Luego crea una referencia a una sala específica en la rtdb utilizando la función ref().
  A continuación, espera a que el valor de la sala cambie utilizando la función onValue().
  Cuando el valor cambia, se ejecuta la función dentro de onValue(), que actualiza cs.rtdbData con el valor actual del juego, establece el estado utilizando this.setState() y llama a this.listenToPlayersStatus().
    */
    async listenToRoom() {
        const cs = this.getState();
        //La función ref se utiliza para crear una referencia a un nodo específico en la base de datos.
        const roomsRef = (0, database_1.ref)(rtdb_1.rtdb, "/rooms/" + cs.rtdbRoomId);
        await (0, database_1.onValue)(roomsRef, (snapshot) => {
            const value = snapshot.val();
            cs.rtdbData = value.currentGame;
            this.setState(cs);
            this.listenToPlayersStatus();
        });
    },
    async listenToResults() {
        const cs = this.getState();
        //Crea referencia a la base de datos en tiempo real. A un room de id especifico
        const roomsRef = (0, database_1.ref)(rtdb_1.rtdb, "/rooms/" + cs.rtdbRoomId);
        /*
     Utiliza la función onValue para escuchar cambios en la referencia roomsRef.
     Cuando ocurre un cambio, obtiene los datos del snapshot y los almacena en movesFromServer.
     Luego, mapea el arreglo movesFromServer.history a movesList.
     Finalmente, itera sobre cada elemento en movesList y lo agrega a resultsArray.
     */
        await (0, database_1.onValue)(roomsRef, (snapshot) => {
            const cs = this.getState();
            const movesFromServer = snapshot.val();
            const movesList = (0, lodash_1.map)(movesFromServer.history);
            const resultsArray = [];
            for (const i of movesList) {
                resultsArray.push(i);
            }
            cs.history = resultsArray;
            this.setState(cs);
        });
    },
    /*
    Devuelve un objeto que contiene el movimiento del jugador y el movimiento del oponente.
     */
    getMoves() {
        const cs = this.getState();
        const currentGame = {
            myMove: cs.myMove,
            opponentMove: cs.rtdbData[cs.opponentId].move,
        };
        return currentGame;
    },
    setMove(Move) {
        const cs = this.getState();
        cs.myMove = Move;
        this.setState(cs);
    },
    getWinner() {
        const cs = this.getState();
        const opponentMove = cs.rtdbData[cs.opponentId].move;
        const opponentName = cs.rtdbData[cs.opponentId].fullname;
        //Empate
        if ((cs.myMove == "rock" && opponentMove == "rock") ||
            (cs.myMove == "paper" && opponentMove == "paper") ||
            (cs.myMove == "scissors" && opponentMove == "scissors")) {
            this.pushWinner("draw");
        }
        //Gana
        if ((cs.myMove == "rock" && opponentMove == "scissors") ||
            (cs.myMove == "paper" && opponentMove == "rock") ||
            (cs.myMove == "scissors" && opponentMove == "paper")) {
            this.pushWinner(cs.fullname);
        }
        //Pierde
        if ((cs.myMove == "scissors" && opponentMove == "rock") ||
            (cs.myMove == "paper" && opponentMove == "scissors") ||
            (cs.myMove == "rock" && opponentMove == "paper")) {
            this.pushWinner(opponentName);
        }
        //Empate
        if ((cs.myMove == "no-move" && opponentMove == "no-move") ||
            (cs.myMove == "no-move" && opponentMove == "no-move") ||
            (cs.myMove == "no-move" && opponentMove == "no-move")) {
            this.pushWinner("draw");
        }
        //Gana porque el oponente no mueve
        if ((cs.myMove == "scissors" && opponentMove == "no-move") ||
            (cs.myMove == "paper" && opponentMove == "no-move") ||
            (cs.myMove == "rock" && opponentMove == "no-move")) {
            this.pushWinner(cs.fullname);
        }
        //Pierde porque no mueve
        if ((cs.myMove == "no-move" && opponentMove == "rock") ||
            (cs.myMove == "no-move" && opponentMove == "scissors") ||
            (cs.myMove == "no-move" && opponentMove == "paper")) {
            this.pushWinner(opponentName);
        }
        this.setState(cs);
    },
    pushWinner(winner) {
        const cs = this.getState();
        fetch(API_BASE_URL + "/history", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                rtdbRoomId: cs.rtdbRoomId,
                result: winner,
            }),
        });
        this.setState(cs);
    },
    getMyWins() {
        const cs = this.getState();
        //busca las partidas ganadas por el usuario
        const filterUserWins = cs.history.filter((i) => {
            return i.result == cs.fullname;
        });
        //promedio de victorias
        return filterUserWins.length / 2;
    },
    getOpponentWins() {
        const cs = this.getState();
        //busca las partidas ganadas por el oponente
        const filterUserWins = cs.history.filter((i) => {
            return i.result == cs.rtdbData[cs.opponentId].fullname;
        });
        //promedia
        return filterUserWins.length / 2;
    },
    /**
   * Escucha el estado de los jugadores.
   * De acuerdo a esto direcciona a la pagina correspondiente
  
   */
    listenToPlayersStatus() {
        const cs = this.getState();
        const cg = cs.rtdbData;
        //Crea un array llamado "players" que contiene todos los valores del objeto "cg".
        const players = Object.values(cg);
        //Verifica si la propiedad online, start y move de cada jugador es true.
        const everyoneIsOnline = players.every((player) => player.online);
        const everyonePushedStart = players.every((player) => player.start);
        const everyoneMoved = players.every((player) => player.move);
        //Verifica si hay 2 usuarios.
        if (players.length == 2) {
            // Si no todos están en línea, se redirige a "/share-code" utilizando el Router.
            if (!everyoneIsOnline) {
                router_1.Router.go("/share-code");
            }
            /*
             Verifica si todos están conectados, nadie ha presionado "start",
             nadie ha movido y la ubicación actual no es "/results".
             Si todas estas condiciones son verdaderas,
             redirige al usuario a "/start" utilizando el Router.
             */
            if (everyoneIsOnline &&
                !everyonePushedStart &&
                !everyoneMoved &&
                location.pathname != "/results") {
                router_1.Router.go("/start");
            }
            /*
            Verifica si todos están en línea, nadie ha presionado el botón de inicio,
            la variable cs.start es verdadera y la página actual no es la página "/results".
            Si se cumplen todas estas condiciones,
            se navega a la página "/waiting" utilizando el método Router.go.
            */
            if (everyoneIsOnline &&
                !everyonePushedStart &&
                cs.start == true &&
                location.pathname != "/results") {
                router_1.Router.go("/waiting");
            }
            /*
            Verifica si todos están en línea, todos han presionado el botón de inicio
            y si nadie se ha movido.
            Si todas estas condiciones son verdaderas, navega a la ruta "/countdown" usando el Router.
             */
            if (everyoneIsOnline && everyonePushedStart && !everyoneMoved) {
                router_1.Router.go("/countdown");
            }
            /*
             Verifica si todos están en línea, si todos han presionado iniciar,
             si todos se han movido y si la ubicación actual no es "/results".
             Si todas estas condiciones son verdaderas, navega a "/moves" utilizando el enrutador (Router).
             */
            if (everyoneIsOnline &&
                everyonePushedStart &&
                everyoneMoved &&
                location.pathname != "/results") {
                router_1.Router.go("/moves");
            }
        }
        //Si hay un solo usuario conectado va a la pagina que muestra codigo de sala para compartir
        if (players.length == 1) {
            router_1.Router.go("/share-code");
        }
    },
};
