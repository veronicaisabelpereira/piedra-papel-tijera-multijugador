"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
//
customElements.define("signin-page", class extends HTMLElement {
    connectedCallback() {
        //Renderiza contenido
        this.render();
        //Guarda la data del estado en una constante
        const cs = state_1.state.getState();
        //en el render hay un form, lo selecciona por su clase y guarda en constante
        const form = this.querySelector(".sign-in__form");
        if (cs.rtdbRoomId) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const nameValue = e.target["name"].value;
                state_1.state.setFullname(nameValue);
                state_1.state.setOnline(true);
                state_1.state.setMove("");
                /*
      Una vez que se complete el proceso de inicio de sesión,
      se establece algunos datos en la base de datos en tiempo real (RTDB) utilizando la función setRTDBdata.
      Si el proceso de establecimiento de datos tiene éxito, se comienza a escuchar una sala utilizando la función listenToRoom.
      Si el proceso de establecimiento de datos falla, se redirige a la ruta "/error" utilizando la función Router.go.
       */
                await state_1.state.signIn(() => {
                    state_1.state
                        .setRTDBdata()
                        .then(() => {
                        state_1.state.listenToRoom();
                    })
                        .catch(() => {
                        router_1.Router.go("/error");
                    });
                });
            });
        }
        else {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const nameValue = e.target["name"].value;
                state_1.state.setFullname(nameValue);
                state_1.state.setOnline(true);
                await state_1.state.signIn(() => {
                    state_1.state.askNewRoom(() => {
                        state_1.state.setRTDBdata().then(() => {
                            state_1.state.listenToRoom();
                        });
                    });
                });
            });
        }
    }
    render() {
        this.innerHTML = `
      <main-title-comp title="Piedra Papel o Tijera"></main-title-comp>
      <form class="sign-in__form">
        <text-field-comp type="text" name="name" placeholder="'tu nombre'"></text-field-comp>
        <button-comp class="button__ingresar-sala">Empezar</button-comp>
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
      .sign-in__form {
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
});
