import { state } from "../state";

customElements.define(
  "results-chart-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    myResult: string;
    opponentResult: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const cs = state.getState();
      const opponentName = cs.rtdbData[cs.opponentId].fullname;

      this.title = this.getAttribute("title") || "";
      this.myResult = this.getAttribute("my-result") || "";
      this.opponentResult = this.getAttribute("opponent-result") || "";

      const div = document.createElement("div");
      div.classList.add("result-chart__div");
      div.innerHTML = `
            <h3 class="result-chart__h3">${this.title}</h3>
            <ol class="result-chart__ol">
              <li class="result-chart__my-result">Vos: ${this.myResult}</li>
              <li class="result-chart__cpu-result">${opponentName}: ${this.opponentResult}</li>
            </ol>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
          .result-chart__div {
            background-color: #FFFFFF;
            border: solid 10px #000000;
            border-radius: 10px;
            color: #D8FCFC;
            width: 259px;
            height: 217px;
            margin: 0;
          }
          .result-chart__h3 {
            font-family: 'Odibee Sans', cursive;
            font-size: 55px;
            color: #000000;
            text-align: center;
            margin: 15px 0 0 0;
          }
          .result-chart__ol {
            padding: 0;
          }
          .result-chart__my-result {
            font-family: 'Odibee Sans', cursive;
            font-size: 45px;
            text-align: right;
            list-style: none;
            color: #000000;
            margin: 0 30px 0 0;
            padding: 0;
          }
          .result-chart__cpu-result {
            font-family: 'Odibee Sans', cursive;
            font-size: 45px;
            text-align: right;
            list-style: none;
            color: #000000;
            margin: 0 30px 0 0;
            padding: 0;
          }
          `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
