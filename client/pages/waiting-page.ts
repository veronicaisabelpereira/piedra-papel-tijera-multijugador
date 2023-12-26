import { state } from "../state";

customElements.define(
  "waiting-page",
  class extends HTMLElement {
    opponentName: string;
    connectedCallback() {
      const cs = state.getState();
      this.opponentName = cs.rtdbData[cs.opponentId].fullname || "";

      state.listenToResults();

      this.render();
    }
    render() {
      const cs = state.getState();

      this.innerHTML = `
              <score-comp player1-name='${cs.fullname}' player2-name='${
        this.opponentName ? this.opponentName : ""
      }' score1-name='${state.getMyWins()}' score2-name='${state.getOpponentWins()}'></score-comp>
              <room-id-comp room-id=${
                cs.roomId ? cs.roomId : ""
              }></room-id-comp>
              <p class="text-waiting">Esperando a que <span class="text-opponent">${
                this.opponentName ? this.opponentName : ""
              }</span> presione ¡Jugar! ...</p>
              <hands-comp></hands-comp>
            `;

      const style = document.createElement("style");
      style.innerHTML = `
              score-comp {
                grid-row: 1;
                grid-column: 1;
                margin-top: 10px;
              }
              room-id-comp {
                grid-row: 1;
                grid-column: 2;
                margin-top: 10px;
              }
              .text-waiting {
                grid-row: 2;
                grid-column: 1 / span 2;
                color: #080808;
                font-family: "American Typewriter Regular";
                font-size: 35px;
                text-align: center;
                min-width: 317px;
                max-width: 754px;
                margin: 0px 30px;
                align-self: center;
              }
              .text-opponent {
                font-family: "American Typewriter Bold";
              }
              hands-comp {
                grid-row: 3;
                grid-column: 1 / span 2;
                align-self: end;
              }
              `;

      this.appendChild(style);
    }
  }
);
