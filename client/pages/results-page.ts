const resultGreenStarImg = require("url:../resources/Star-1.png");
const resultRedStarImg = require("url:../resources/Star-2.png");
const resultYellowStarImg = require("url:../resources/Star-3.png");

const rectangleOne = require("url:../resources/Rectangle-1.png");
const rectangleTwo = require("url:../resources/Rectangle-2.png");
const rectangleThree = require("url:../resources/Rectangle-3.png");

import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "results-page",
  class extends HTMLElement {
    connectedCallback() {
      setTimeout(() => {
        this.render();

        const returnButtonEl = this.querySelector(
          ".button__return"
        ) as HTMLElement;

        returnButtonEl.addEventListener("click", () => {
          state.setMove("");
          state.setRTDBdata();
          Router.go("/start");
        });
      }, 1000);

      state.setStart(false);
      state.setRTDBdata();

      this.render();
    }
    render() {
      const cg = state.getMoves();

      if (
        (cg.opponentMove == "rock" && cg.myMove == "rock") ||
        (cg.opponentMove == "paper" && cg.myMove == "paper") ||
        (cg.opponentMove == "scissors" && cg.myMove == "scissors")
      ) {
        this.innerHTML = `
            <div class="result-page-draw__screen">
              <star-comp text="Empate" img="${resultYellowStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }
      if (
        (cg.opponentMove == "rock" && cg.myMove == "scissors") ||
        (cg.opponentMove == "paper" && cg.myMove == "rock") ||
        (cg.opponentMove == "scissors" && cg.myMove == "paper")
      ) {
        this.innerHTML = `
            <div class="result-page-cpu-wins__screen">
              <star-comp text="Perdiste" img="${resultRedStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }
      if (
        (cg.opponentMove == "scissors" && cg.myMove == "rock") ||
        (cg.opponentMove == "paper" && cg.myMove == "scissors") ||
        (cg.opponentMove == "rock" && cg.myMove == "paper")
      ) {
        this.innerHTML = `
            <div class="result-page-user-wins__screen">
              <star-comp text="Ganaste" img="${resultGreenStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }
      if (
        (cg.opponentMove == "no-move" && cg.myMove == "no-move") ||
        (cg.opponentMove == "no-move" && cg.myMove == "no-move") ||
        (cg.opponentMove == "no-move" && cg.myMove == "no-move")
      ) {
        this.innerHTML = `
            <div class="result-page-draw__screen">
              <star-comp text="Empate" img="${resultYellowStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }
      if (
        (cg.opponentMove == "rock" && cg.myMove == "no-move") ||
        (cg.opponentMove == "paper" && cg.myMove == "no-move") ||
        (cg.opponentMove == "scissors" && cg.myMove == "no-move")
      ) {
        this.innerHTML = `
            <div class="result-page-cpu-wins__screen">
              <star-comp text="Perdiste" img="${resultRedStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }
      if (
        (cg.opponentMove == "no-move" && cg.myMove == "rock") ||
        (cg.opponentMove == "no-move" && cg.myMove == "scissors") ||
        (cg.opponentMove == "no-move" && cg.myMove == "paper")
      ) {
        this.innerHTML = `
            <div class="result-page-user-wins__screen">
              <star-comp text="Ganaste" img="${resultGreenStarImg}"></star-comp>
              <results-chart-comp title="Puntaje" my-result="${state.getMyWins()}" opponent-result="${state.getOpponentWins()}"></results-chart-comp>
              <button-comp class="button__return">Volver a jugar</button-comp>
            </div>
        `;
      }

      const style = document.createElement("style");
      style.innerHTML = `
          .result-page-draw__screen {
            background-image: url(${rectangleThree});
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto;
            align-content: space-around;
            justify-items: center;
            height: 100vh;
          }
          .result-page-cpu-wins__screen {    
            background-image: url(${rectangleTwo});
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto;
            align-content: space-around;
            justify-items: center;
            height: 100vh;
          }
          .result-page-user-wins__screen {
            background-image: url(${rectangleOne});
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto;
            align-content: space-around;
            justify-items: center;
            height: 100vh;
          }
          star-comp {
            grid-row: 1;
            align-self: center;
          }
          results-chart-comp {
            grid-row: 2;
            align-self: center;
          }
          button-comp {
            grid-row: 3;
            align-self: center;
          }
          `;

      this.appendChild(style);
    }
  }
);
