"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
//
customElements.define("code-room", class extends HTMLElement {
    /*
    Declara dos atributos (roomId y opponentName) en la clase
    para almacenar información sobre el ID de la sala y el nombre del oponente.
    */
    roomId;
    opponentName;
    /*
    Este método se llama cuando el elemento es conectado al árbol DOM.
    Aquí se suscribe a cambios en el estado, configura la información de la sala y del oponente,
    y luego llama al método render para actualizar la interfaz de usuario.
     */
    connectedCallback() {
        //Se suscribe a cambios en el estado para actualizar la información de la sala cuando cambie.
        state_1.state.subscribe(() => {
            const currentState = state_1.state.getState();
            this.roomId = currentState.roomId;
            this.render();
        });
        /*
        Obtención de datos del estado:
        Obtiene el estado actual y configura el roomId del componente.
         */
        const cs = state_1.state.getState();
        this.roomId = cs.roomId;
        /*
        Determinación del oponente:
        Determina el ID y el nombre del oponente a partir de los datos en cs.rtdbData y configura opponentName.
        Si no hay un segundo elemento en getEntries, establece opponentName como una cadena vacía.
         */
        //Obtiene los datos de cs.rtdbData y los asigna a getEntries
        var getEntries = Object.entries(cs.rtdbData);
        if (getEntries[1]) {
            //Si getEntries tiene al menos dos elementos,
            //crea un idArray que contiene las primeras dos claves de getEntries
            var idArray = [getEntries[0][0], getEntries[1][0]];
            //Busca un oppId en idArray que no sea igual a cs.userId
            const oppId = idArray.find((id) => {
                return cs.userId != id;
            });
            //Establece this.opponentName como el valor de cs.rtdbData[oppId].fullname
            this.opponentName = cs.rtdbData[oppId].fullname;
            //Establece el ID del oponente en el objeto state
            state_1.state.setOpponentId(oppId);
        }
        //Si getEntries tiene menos de dos elementos,
        //establece this.opponentName como una cadena vacía.
        else {
            this.opponentName = "";
        }
        //Configuración y escucha de resultados en el estado:
        state_1.state.listenToResults();
        //render
        this.render();
    }
    render() {
        const cs = state_1.state.getState();
        this.innerHTML = `
              <score-comp player1-name='${cs.fullname}' player2-name='${this.opponentName ? this.opponentName : ""}' score1-name='${state_1.state.getMyWins()}' score2-name='${state_1.state.getOpponentWins()}'></score-comp>
              <room-id-comp room-id=${this.roomId ? this.roomId : ""}></room-id-comp>
              <div class="text-container">
                <p class="text-share-code1">Compartí el código:</p>
                <span class="text-room-id">${this.roomId ? this.roomId : "cargando..."}</span>
                <p class="text-share-code2">con tu contrincante</p>
              </div>
              <hands-comp></hands-comp>
            `;
    }
});
