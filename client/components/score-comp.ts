customElements.define(
  "score-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    player1: String;
    player2: String;
    score1: String;
    score2: String;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.player1 = this.getAttribute("player1-name") || "";
      this.player2 = this.getAttribute("player2-name") || "";

      this.score1 = this.getAttribute("score1-name") || "0";
      this.score2 = this.getAttribute("score2-name") || "0";

      const div = document.createElement("div");
      div.classList.add("score-comp__div");

      div.innerHTML = `
        <p class="score-comp__p1">${
          this.player1 ? this.player1 : "jugador 1"
        }: <span class="score-comp__s1">${this.score1}</span></p>
        <p class="score-comp__p2">${
          this.player2 ? this.player2 : "jugador 2"
        }: <span class="score-comp__s2">${this.score2}</span></p>
      `;

      const style = document.createElement("style");

      style.innerHTML = `
        .score-comp__div {
          text-align: left;
          font-size: 24px;
        }
        .score-comp__p1 {
          font-family: "American Typewriter Regular";
          color: #080808;
          margin: 0;
        }
        .score-comp__s1 {
          font-family: "American Typewriter Bold";
          color: #080808;
          margin: 0;
        }
        .score-comp__p2 {
          font-family: "American Typewriter Regular";
          color: #FF6442;
          margin: 0;
        }
        .score-comp__s2 {
          font-family: "American Typewriter Bold";
          color: #FF6442;
          margin: 0;
        }
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
