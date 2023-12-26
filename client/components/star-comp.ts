customElements.define(
  "star-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    text: string;
    img: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.text = this.getAttribute("text") || "";
      this.img = this.getAttribute("img") || "";

      const div = document.createElement("div");
      div.classList.add("result-star__div");
      div.innerHTML = `
        <img class="result-star__img" src="${this.img}"/>
        <h2 class="result-star__h2">${this.text}</h2>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
          .result-star__div {
            position: relative;
            display: inline-block;
            text-align: center;
          }
          .result-star__img {
          width: 254px;
          height: 259px;
          }
          .result-star__h2 {
            color: #FFFFFF;
            font-family: 'Odibee Sans', cursive;          
            font-size: 55px;
            font-weight: 400;
            line-height: 61px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
          }
          `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
