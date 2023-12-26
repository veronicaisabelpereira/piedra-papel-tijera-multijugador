customElements.define(
  "text-field-comp",
  class extends HTMLElement {
    type: string;
    name: string;
    placeholder: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.type = this.getAttribute("type") || "";
      this.name = this.getAttribute("name") || "";
      this.placeholder = this.getAttribute("placeholder") || "";

      this.innerHTML = `
        <input class="input" type=${this.type} name=${this.name} placeholder=${this.placeholder}>
        <p class="no-room">La sala no existe, pruebe con otro código</p>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
        .input {
            background-color: #fafafa;
            border: solid 10px #001997;
            border-radius: 10px;
            color: #080808;
            font-family: 'Odibee Sans', cursive;
            font-size: 45px;
            text-align: center;
            width: 322px;
            height: 87px;
            margin: 0;
        }
        .no-room {
            display: none;
            color: #EA2027;
            font-family: cursive;
            margin: 0;
        }
      `;

      this.appendChild(style);
    }
  }
);
