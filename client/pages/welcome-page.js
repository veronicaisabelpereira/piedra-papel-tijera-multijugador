"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
customElements.define("welcome-page", class extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.render();
        this.connectedCallback();
    }
    render() {
        this.shadow.innerHTML = `
      <main-title-comp title="Piedra Papel o Tijera"></main-title-comp>
      <div class="button-container">
        <button-comp class="button__nuevo-juego">Nuevo juego</button-comp>
        <button-comp class="button__ingresar-sala">Ingresar a una sala</button-comp>
      </div>
      <hands-comp></hands-comp>
    `;
        const style = document.createElement("style");
        style.innerHTML = `
      main-title-comp {
        grid-row: 1;
        align-self: center;
        margin-top: 25px;
      }
      .button-container {
        grid-row: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        gap: 20px;
      }
      hands-comp {
        grid-row: 3;
        align-self: end;
      }
      `;
        this.shadow.appendChild(style);
    }
    connectedCallback() {
        const newGameButtonEl = this.shadow.querySelector(".button__nuevo-juego");
        const enterRoomButtonEl = this.shadow.querySelector(".button__ingresar-sala");
        newGameButtonEl.addEventListener("click", () => {
            router_1.Router.go("/sign-in");
        });
        enterRoomButtonEl.addEventListener("click", () => {
            router_1.Router.go("/enter-room");
        });
    }
});
