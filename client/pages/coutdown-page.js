"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
customElements.define("countdown-page", class extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            const cg = state_1.state.getMoves();
            if (cg.myMove == "") {
                state_1.state.setMove("no-move");
                state_1.state.setRTDBdata();
            }
            else {
                state_1.state.setRTDBdata();
            }
        }, 5000);
        this.render();
    }
    render() {
        this.innerHTML = `
        <countdown-comp></countdown-comp>
        <rock-paper-scissors-comp></rock-paper-scissors-comp>
      `;
        const style = document.createElement("style");
        style.innerHTML = `
        countdown-comp {
          grid-row: 1;
        }
        rock-paper-scissors-comp {
          grid-row: 2;
          align-self: end;
        }
        `;
        this.appendChild(style);
    }
});
