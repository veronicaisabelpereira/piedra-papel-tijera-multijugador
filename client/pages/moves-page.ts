const piedraImg = require("url:../resources/piedra.png");
const papelImg = require("url:../resources/papel.png");
const tijeraImg = require("url:../resources/tijera.png");
import { defaultMaxListeners } from "events";
import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "moves-page",
  class extends HTMLElement {
    connectedCallback() {
      setTimeout(() => {
        state.getWinner();
        state.getMyWins();
        state.getOpponentWins();
        state.listenToResults();
        Router.go("/results");
      }, 3000);

      this.render();
    }
    render() {
      const cg = state.getMoves();

      if (cg.opponentMove == "rock" && cg.myMove == "rock") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${piedraImg}></img>
            <img class="bottom-hand" src=${piedraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "paper" && cg.myMove == "paper") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${papelImg}></img>
            <img class="bottom-hand" src=${papelImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "scissors" && cg.myMove == "scissors") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${tijeraImg}></img>
            <img class="bottom-hand" src=${tijeraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "rock" && cg.myMove == "scissors") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${piedraImg}></img>
            <img class="bottom-hand" src=${tijeraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "paper" && cg.myMove == "rock") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${papelImg}></img>
            <img class="bottom-hand" src=${piedraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "scissors" && cg.myMove == "paper") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${tijeraImg}></img>
            <img class="bottom-hand" src=${papelImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "scissors" && cg.myMove == "rock") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${tijeraImg}></img>
            <img class="bottom-hand" src=${piedraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "paper" && cg.myMove == "scissors") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${papelImg}></img>
            <img class="bottom-hand" src=${tijeraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "rock" && cg.myMove == "paper") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${piedraImg}></img>
            <img class="bottom-hand" src=${papelImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "no-move" && cg.myMove == "no-move") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <h1 class="top-no-move">?</h1>
            <h1 class="bottom-no-move">?</h1>
          </div>
        `;
      }
      if (cg.opponentMove == "no-move" && cg.myMove == "rock") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <h1 class="top-no-move">?</h1>
            <img class="bottom-hand" src=${piedraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "no-move" && cg.myMove == "paper") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <h1 class="top-no-move">?</h1>
            <img class="bottom-hand" src=${papelImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "no-move" && cg.myMove == "scissors") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <h1 class="top-no-move">?</h1>
            <img class="bottom-hand" src=${tijeraImg}></img>
          </div>
        `;
      }
      if (cg.opponentMove == "rock" && cg.myMove == "no-move") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${piedraImg}></img>
            <h1 class="bottom-no-move">?</h1>
          </div>
        `;
      }
      if (cg.opponentMove == "paper" && cg.myMove == "no-move") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${papelImg}></img>
            <h1 class="bottom-no-move">?</h1>
          </div>
        `;
      }
      if (cg.opponentMove == "scissors" && cg.myMove == "no-move") {
        this.innerHTML = `
          <div class="moves-comp__div">
            <img class="top-hand" src=${tijeraImg}></img>
            <h1 class="bottom-no-move">?</h1>
          </div>
        `;
      }

      const style = document.createElement("style");
      style.innerHTML = `
        .moves-comp__div {
          display: grid;
        }
        .top-hand {
          grid-row: 1;
          width: 156px;
          height: 312px;
          -webkit-transform: rotate(-180deg);
          -moz-transform: rotate(-180deg);
          -ms-transform: rotate(-180deg);
          transform: rotate(-180deg);
        }
        .bottom-hand {
          grid-row: 2;
          width: 156px;
          height: 312px;
          align-self: flex-end;
        }
        .top-no-move {
          color: #009048;
          font-family: "American Typewriter Bold";
          font-size: 180px;
          margin: 0 auto;
          -webkit-transform: rotate(-180deg);
          -moz-transform: rotate(-180deg);
          -ms-transform: rotate(-180deg);
          transform: rotate(-180deg);
        }
        .bottom-no-move {
          color: #009048;
          font-family: "American Typewriter Bold";
          font-size: 180px;
          margin: 0 auto;
        }
        `;

      this.appendChild(style);
    }
  }
);
