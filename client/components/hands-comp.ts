const piedraImg = require("url:../resources/piedra.png");
const papelImg = require("url:../resources/papel.png");
const tijeraImg = require("url:../resources/tijera.png");

customElements.define(
  "hands-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
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
  }
);
