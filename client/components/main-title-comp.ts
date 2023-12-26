customElements.define(
  "main-title-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.title = this.getAttribute("title") || "";

      const div = document.createElement("div");
      div.classList.add("main-title__div");
      div.innerHTML = `
          <h1 class="main-title__h1">${this.title}</h1>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
          .main-title__div {
            width: 294px;
            height: 204px;
          }
          .main-title__h1 {
            color: #009048;
            font-family: "American Typewriter Bold";
            font-size: 75px;
            line-height: 70.48px;
            margin: 0;
          }
          `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
