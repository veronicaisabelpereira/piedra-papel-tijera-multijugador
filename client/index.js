"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importa componentes
require("./components/button-comp");
require("./components/main-title-comp");
require("./components/hands-comp");
require("./components/rock-paper-scissors-comp");
require("./components/text-field-comp");
require("./components/score-comp");
require("./components/room-id-comp");
require("./components/countdown-comp");
require("./components/star-comp");
require("./components/results-chart-comp");
//Importa paginas
require("./pages/welcome-page");
require("./pages/enter-room");
require("./pages/signin-page");
require("./pages/error-page");
require("./pages/code-room");
require("./pages/start-page");
require("./pages/waiting-page");
require("./pages/coutdown-page");
require("./pages/moves-page");
require("./pages/results-page");
//Importa el router
require("./router");
//Importa el state
const state_1 = require("./state");
/*
Agrega un event listener al evento "beforeunload" del objeto window.
Este evento se dispara justo antes de que la ventana se cierre o se actualice.
Cuando se dispara el evento, se evita el comportamiento predeterminado,
se establece el estado en línea como falso, se borra el movimiento
y se actualizan los datos de RTDB (Realtime Database).
Luego, se inicializa el estado.
 */
(function () {
    window.addEventListener("beforeunload", function (event) {
        event.preventDefault();
        state_1.state.setOnline(false);
        state_1.state.setMove("");
        state_1.state.setRTDBdata();
    });
    state_1.state.init();
})();
