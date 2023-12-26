customElements.define(
  "button-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.innerHTML = `
        <button class="button">${this.textContent}</button>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
        .button {
            background-color: #006CFC;
            border: solid 10px #001997;
            border-radius: 10px;
            color: #D8FCFC;
            font-family: 'Odibee Sans', cursive;
            font-size: 45px;
            min-width: 322px;
            min-height: 87px;
            margin: 0;
        }
      `;

      this.appendChild(style);
    }
  }
);
