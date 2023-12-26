customElements.define(
  "countdown-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("countdown__div");

      div.innerHTML = `
          <h1 class="countdown__number"></h1>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
          .countdown__number {
            color: #000000;
            font-family: "American Typewriter Bold";
            font-size: 170px;
          }
        `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      var initCount = 3;

      (function doCount() {
        const numberEl = div.querySelector(".countdown__number") as HTMLElement;
        numberEl.textContent = `${initCount}`;

        if (initCount == 0) {
          numberEl.textContent = "0";
        } else {
          initCount--;
          setTimeout(doCount, 1000);
        }
      })();
    }
  }
);
