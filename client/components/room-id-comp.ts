customElements.define(
  "room-id-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    roomId: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.roomId = this.getAttribute("room-id") || "";

      const div = document.createElement("div");
      div.classList.add("room-id-comp__div");

      div.innerHTML = `
          <p class="room-id-comp__sala">Sala</p>
          <p class="room-id-comp__id">${this.roomId}</p>
        `;

      const style = document.createElement("style");

      style.innerHTML = `
          .room-id-comp__div {
            text-align: right;
            font-size: 24px;
            color: #080808;
          }
          .room-id-comp__sala {
            font-family: "American Typewriter Bold";
            margin: 0;
          }
          .room-id-comp__id {
            font-family: "American Typewriter Regular";
            margin: 0;
          }
        `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
