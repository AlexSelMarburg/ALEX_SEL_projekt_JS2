import { gameSetting, resetGameSettings } from "../js/app.js";

const style = document.createElement("style");
style.textContent = `@import "css/dungeon-info-panel.css";`;

export class DungeonInfoPanel extends HTMLElement {
  static template = document.createElement("template");

  static {
    DungeonInfoPanel.template.innerHTML = /*html*/ `
        <div id="level-info-container">
          <div id="dungeon-info">
            <div id="waves-left">
              <div id="waves-count">0</div>
              <div id="waves-info">Feindwellen</div>
            </div>
          </div>
          <button id="start-menu">Start Menu</button>
          <button id="performence-btn">toggle perfomance</button>
        </div>
    `;
  }

  constructor(leaveDungeonFN) {
    super();
    this.leaveDungeonFN = leaveDungeonFN;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      DungeonInfoPanel.template.content.cloneNode(true)
    );
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#performence-btn")
      .addEventListener("click", () => {
        gameSetting.isPerformanceMode = !gameSetting.isPerformanceMode;
        if (gameSetting.gameEngine)
          gameSetting.gameEngine.updateIsPerformanceMode(
            gameSetting.isPerformanceMode
          );
      });

    this.shadowRoot
      .querySelector("#start-menu")
      .addEventListener("click", () => {
        this.leaveDungeonFN();
      });
  }

  setWavesCount(count) {
    this.shadowRoot.getElementById("waves-count").textContent = count;
  }
}
customElements.define("dungeon-info-panel", DungeonInfoPanel);
