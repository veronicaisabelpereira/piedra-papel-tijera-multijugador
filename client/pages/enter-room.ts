import { Router } from "@vaadin/router";
import { state } from "../state";
//
customElements.define(
  "enter-room",
  class extends HTMLElement {
    connectedCallback() {
      this.render();

      const signInFormEl = this.querySelector(
        ".enter-room__form"
      ) as HTMLElement;
      const textFieldEl = this.querySelector("text-field-comp") as HTMLElement;
      const input = textFieldEl.querySelector(".input") as HTMLElement;
      const noRoom = textFieldEl.querySelector(".no-room") as HTMLElement;

      signInFormEl.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const codeValue = e.target["code"].value;

        state.setRoomId(codeValue.toUpperCase());

        state
          .getExistingRoom()
          .then(() => {
            Router.go("/sign-in");
          })
          .catch(() => {
            input.style.border = "solid 10px #EA2027";
            input.style.backgroundColor = "#ff7979";
            noRoom.style.display = "block";
          });
      });
    }
    render() {
      this.innerHTML = `
        <main-title-comp title="Piedra Papel o Tijera"></main-title-comp>
        <form class="enter-room__form">
          <text-field-comp type="text" name="code" placeholder="'código'"></text-field-comp>
          <button-comp class="button__ingresar-sala">Ingresar</button-comp>
        </form>
        <hands-comp></hands-comp>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
        main-title-comp {
          grid-row: 1;
          align-self: center;
          margin-top: 25px;
        }
        .enter-room__form {
          grid-row: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-self: center;
          gap: 20px;
        }
        hands-comp {
          grid-row: 3;
          align-self: end;
        }
        `;

      this.appendChild(style);
    }
  }
);
