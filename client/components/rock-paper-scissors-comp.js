"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const piedraImg = require("url:../resources/piedra.png");
const papelImg = require("url:../resources/papel.png");
const tijeraImg = require("url:../resources/tijera.png");
const state_1 = require("../state");
customElements.define("rock-paper-scissors-comp", class extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.render();
        this.makeAMove();
    }
    render() {
        const div = document.createElement("div");
        div.classList.add("piedra-papel-tijera__div");
        div.innerHTML = `
            <img class="piedra__img" src="${piedraImg}" /img>
            <img class="papel__img" src="${papelImg}" /img>
            <img class="tijera__img" src="${tijeraImg}" /img>
          `;
        const style = document.createElement("style");
        style.innerHTML = `
        img {
            align-self: flex-end;
        }
        .piedra-papel-tijera__div {
            display: flex;
            gap: 46px;
        }
          `;
        this.shadow.appendChild(div);
        this.shadow.appendChild(style);
    }
    makeAMove() {
        // TRAE LOS ELEMENTOS DEL SHADOW
        const divEl = this.shadow.querySelector(".piedra-papel-tijera__div");
        const piedraEl = this.shadow.querySelector(".piedra__img");
        const papelEl = this.shadow.querySelector(".papel__img");
        const tijeraEl = this.shadow.querySelector(".tijera__img");
        // APLICA LOS LISTENERS
        piedraEl.addEventListener("click", () => {
            state_1.state.setMove("rock");
            divEl.style.gap = "32px";
            papelEl.style.opacity = "0.5";
            tijeraEl.style.opacity = "0.5";
            piedraEl.style.height = "200px";
            papelEl.style.height = "100px";
            tijeraEl.style.height = "100px";
        });
        papelEl.addEventListener("click", () => {
            state_1.state.setMove("paper");
            divEl.style.gap = "32px";
            piedraEl.style.opacity = "0.5";
            tijeraEl.style.opacity = "0.5";
            papelEl.style.height = "200px";
            piedraEl.style.height = "100px";
            tijeraEl.style.height = "100px";
        });
        tijeraEl.addEventListener("click", () => {
            state_1.state.setMove("scissors");
            divEl.style.gap = "32px";
            papelEl.style.opacity = "0.5";
            piedraEl.style.opacity = "0.5";
            tijeraEl.style.height = "200px";
            papelEl.style.height = "100px";
            piedraEl.style.height = "100px";
        });
    }
});
