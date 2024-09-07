import { sfxPlayer } from "./AudioPlayer.js";

import { loadJSON } from "./lib/utils.js";
import { gameSetting } from "../js/app.js";
import { LocalSewers } from "./level/LocalSewers.js";
import { LevelSelectDisplay } from "./LevelSelectDisplay.js";
import { GameEngine } from "./GameEngine.js";

const style = document.createElement("style");
style.textContent = `@import "../css/board/select-level-panel.css";`;

export class SelectLevelPanel extends HTMLElement {
  static template = document.createElement("template");

  static {
    SelectLevelPanel.template.innerHTML = /*html*/ `
         <div id="select-level-container">
          <div>
            <h2>Selected: <span id="selected-level"></span></h2>
            <button id="select-level-btn">SELECT LEVEL</button>
          </div>
          <div id="levels-container"></div>
        </div>

        <style>
        #selected-level {
            color: #fff !important;
        }
        </style>
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      SelectLevelPanel.template.content.cloneNode(true)
    );
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
    this.levels = null;
    this.selected = LocalSewers;
    this.levelDisplays = [];
  }

  async connectedCallback() {
    this.levels = await this.getLevels();
    this.shadowRoot.getElementById("selected-level").textContent =
      this.selected.title;

    this.levels.forEach((level, index) => {
      const levelDisplay = new LevelSelectDisplay(
        level,
        index,
        this.selectTemplate
      );
      this.levelDisplays.push(levelDisplay);
      this.shadowRoot
        .getElementById("levels-container")
        .appendChild(levelDisplay);
      if (index === 0) {
        levelDisplay.addSelectedClass();
      }
    });

    this.shadowRoot
      .getElementById("select-level-btn")
      .addEventListener("click", () => {
        sfxPlayer.play("CLICK_BTN");
        gameSetting.level = this.selected;
        this.remove();

        const hero = gameSetting.heroData
          ? new gameSetting.hero(gameSetting.heroData)
          : new gameSetting.hero();

        gameSetting.gameEngine = new GameEngine();
        gameSetting.gameEngine.init(hero, new gameSetting.level());
        gameSetting.gameEngine.startGame();
      });
  }

  selectTemplate = (template, id) => {
    if (template === this.selected) return;
    sfxPlayer.play("CLICK_BTN");
    this.selected = template;
    this.shadowRoot.getElementById("selected-level").textContent =
      this.selected.title;
    this.levelDisplays.forEach((hero) => hero.removeSelectedClass());
    this.levelDisplays[id].addSelectedClass();
  };

  async getLevels() {
    const levels = await loadJSON("./data/levels.json");
    return levels;
  }
}
customElements.define("select-level-panel", SelectLevelPanel);
