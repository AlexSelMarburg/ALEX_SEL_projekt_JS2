import { sfxPlayer } from "./AudioPlayer.js";
import { SelecSavedtHeroPanel } from "./SelecSavedtHeroPanel.js";
import { SelectHeroPanel } from "./SelectHeroPanel.js";

const style = document.createElement("style");
style.textContent = `@import "../css/board/start-game-panel.css";`;

export class StartGamePanel extends HTMLElement {
  static template = document.createElement("template");

  static {
    StartGamePanel.template.innerHTML = /*html*/ `
        <div id="start-game-container">
            <div id="buttons-container">
            <button id="btn-start-game">Start New Game</button>
            <button id="load-game">Load Game</button>
            </div>
        </div>
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      StartGamePanel.template.content.cloneNode(true)
    );
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
  }

  connectedCallback() {
    const startGameButton = this.shadowRoot.getElementById("btn-start-game");
    startGameButton.addEventListener("click", () => {
      sfxPlayer.play("CLICK_BTN");
      document
        .querySelector("#game-container #game-right-container")
        .appendChild(new SelectHeroPanel());
      this.remove();
    });

    const loadGameButton = this.shadowRoot.getElementById("load-game");
    loadGameButton.addEventListener("click", () => {
      sfxPlayer.play("CLICK_BTN");
      document
        .querySelector("#game-container #game-right-container")
        .appendChild(new SelecSavedtHeroPanel());
      this.remove();
    });
  }
}
customElements.define("start-game-panel", StartGamePanel);
