//Importa componentes
import "./components/button-comp";
import "./components/main-title-comp";
import "./components/hands-comp";
import "./components/rock-paper-scissors-comp";
import "./components/text-field-comp";
import "./components/score-comp";
import "./components/room-id-comp";
import "./components/countdown-comp";
import "./components/star-comp";
import "./components/results-chart-comp";
//Importa paginas
import "./pages/welcome-page";
import "./pages/enter-room";
import "./pages/signin-page";
import "./pages/error-page";
import "./pages/code-room";
import "./pages/start-page";
import "./pages/waiting-page";
import "./pages/coutdown-page";
import "./pages/moves-page";
import "./pages/results-page";
//Importa el router
import "./router";
//Importa el state
import { state } from "./state";
import { stat } from "fs";
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
    state.setOnline(false);
    state.setMove("");
    state.setRTDBdata();
  });

  state.init();
})();
