import { Router } from "@vaadin/router";

customElements.define(
  "error-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.connectedCallback();
    }

    render() {
      this.shadow.innerHTML = `
            <main-title-comp title="Piedra Papel o Tijera"></main-title-comp>
            <p class="text-error">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</p>
            <button-comp class="button__volver">Volver</button-comp>
            <hands-comp></hands-comp>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
            main-title-comp {
              grid-row: 1;
              align-self: center;
              margin-top: 25px;
            }
            .text-error {
              grid-row: 2;
              color: #080808;
              font-family: "American Typewriter Regular";
              font-size: 35px;
              text-align: center;
              min-width: 317px;
              max-width: 754px;
              margin: 0px 30px;
            }
            .button__volver {
              grid-row: 3;
            }
            hands-comp {
              grid-row: 4;
              align-self: end;
            }
            `;

      this.shadow.appendChild(style);
    }
    connectedCallback() {
      const buttonVolverEl = this.shadow.querySelector(
        ".button__volver"
      ) as HTMLElement;

      buttonVolverEl.addEventListener("click", () => {
        Router.go("/main");
      });
    }
  }
);
