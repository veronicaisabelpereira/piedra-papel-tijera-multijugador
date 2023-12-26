import { state } from "../state";

customElements.define(
  "countdown-page",
  class extends HTMLElement {
    connectedCallback() {
      setTimeout(() => {
        const cg = state.getMoves();
        if (cg.myMove == "") {
          state.setMove("no-move");
          state.setRTDBdata();
        } else {
          state.setRTDBdata();
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
  }
);
