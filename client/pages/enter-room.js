"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
//
customElements.define("enter-room", class extends HTMLElement {
    connectedCallback() {
        this.render();
        const signInFormEl = this.querySelector(".enter-room__form");
        const textFieldEl = this.querySelector("text-field-comp");
        const input = textFieldEl.querySelector(".input");
        const noRoom = textFieldEl.querySelector(".no-room");
        signInFormEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const codeValue = e.target["code"].value;
            state_1.state.setRoomId(codeValue.toUpperCase());
            state_1.state
                .getExistingRoom()
                .then(() => {
                router_1.Router.go("/sign-in");
            })
                .catch(() => {
                input.style.border = "solid 10px #EA2027";
                input.style.backgroundColor = "#ff7979";
                noRoom.style.display = "block";
            });
        });
    }
    render() {
        this.innerHTML = `
        <main-title-comp title="Piedra Papel o Tijera"></main-title-comp>
        <form class="enter-room__form">
          <text-field-comp type="text" name="code" placeholder="'código'"></text-field-comp>
          <button-comp class="button__ingresar-sala">Ingresar</button-comp>
        </form>
        <hands-comp></hands-comp>
      `;
        const style = document.createElement("style");
        style.innerHTML = `
        main-title-comp {
          grid-row: 1;
          align-self: center;
          margin-top: 25px;
        }
        .enter-room__form {
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
        this.appendChild(style);
    }
});
