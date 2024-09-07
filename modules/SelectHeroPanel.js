import { sfxPlayer } from "./AudioPlayer.js";

import { HeroSelectDisplay } from "./HeroSelectDisplay.js";
import { loadJSON } from "./lib/utils.js";
import { gameSetting, resetGameSettings } from "../js/app.js";
import { TemplarCard } from "./Hero/TemplarCard.js";
import { SelectLevelPanel } from "./SelectLevelPanel.js";
import { StartGamePanel } from "./StartGamePanel.js";

const style = document.createElement("style");
style.textContent = `@import "../css/board/select-hero-panel.css";`;

export class SelectHeroPanel extends HTMLElement {
  static template = document.createElement("template");

  static {
    SelectHeroPanel.template.innerHTML = /*html*/ `
        <div id="select-hero-container">
            <div>
                <h2>Selected: <span id="selected-hero"></span></h2>
                <div>
                  <button id="start-menu">Start Menu</button>
                  <button id="select-hero-btn">SELECT HERO</button>
                </div>
            </div>
            <div id="heroes-container">
            </div>
        </div>

        <style>
        #selected-hero {
            color: #fff !important;
        }
        </style>
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      SelectHeroPanel.template.content.cloneNode(true)
    );
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
    this.heroes = null;
    this.selected = TemplarCard;
    this.heroDisplays = [];
  }

  leaveDungeon = () => {
    sfxPlayer.play("CLICK_BTN");
    this.remove();
    resetGameSettings();
    document
      .querySelector("#game-container #game-right-container")
      .appendChild(new StartGamePanel());
  };

  initLeaveDungeonButton() {
    this.shadowRoot
      .getElementById("start-menu")
      .addEventListener("click", this.leaveDungeon);
  }

  async connectedCallback() {
    this.initLeaveDungeonButton();
    this.heroes = await this.getHeroes();
    this.shadowRoot.getElementById("selected-hero").textContent =
      this.selected.data.entityName;

    this.heroes.forEach((hero, index) => {
      const heroDisplay = new HeroSelectDisplay(
        hero,
        index,
        this.selectTemplate
      );
      this.heroDisplays.push(heroDisplay);
      this.shadowRoot
        .getElementById("heroes-container")
        .appendChild(heroDisplay);
      if (index === 0) {
        heroDisplay.addSelectedClass();
      }
    });

    this.shadowRoot
      .getElementById("select-hero-btn")
      .addEventListener("click", () => {
        sfxPlayer.play("CLICK_BTN");
        gameSetting.hero = this.selected;
        gameSetting.heroData = null;
        this.remove();
        document
          .querySelector("#game-container #game-right-container")
          .appendChild(new SelectLevelPanel());
      });
  }

  selectTemplate = (template, id) => {
    if (template === this.selected) return;
    sfxPlayer.play("CLICK_BTN");
    this.selected = template;
    this.shadowRoot.getElementById("selected-hero").textContent =
      this.selected.data.entityName;
    this.heroDisplays.forEach((hero) => hero.removeSelectedClass());
    this.heroDisplays[id].addSelectedClass();
  };

  async getHeroes() {
    const heroes = await loadJSON("./data/heroes.json");
    return heroes;
  }
}
customElements.define("select-hero-panel", SelectHeroPanel);
