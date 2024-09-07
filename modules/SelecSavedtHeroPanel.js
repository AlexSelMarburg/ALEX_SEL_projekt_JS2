import { sfxPlayer } from "./AudioPlayer.js";
import { gameSetting, resetGameSettings } from "../js/app.js";
import { SelectLevelPanel } from "./SelectLevelPanel.js";
import { HeroSavedSelectDisplay } from "./HeroSavedSelectDisplay.js";
import { db } from "./db.js";
import { heroes } from "./Hero/heroes.js";
import { consumables } from "./consumable/consumables.js";
import { StartGamePanel } from "./StartGamePanel.js";

const style = document.createElement("style");
style.textContent = `@import "../css/board/select-hero-panel.css";`;

export class SelecSavedtHeroPanel extends HTMLElement {
  static template = document.createElement("template");

  static {
    SelecSavedtHeroPanel.template.innerHTML = /*html*/ `
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
      SelecSavedtHeroPanel.template.content.cloneNode(true)
    );
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
    this.selected = null;
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
    this.initHeroDataDisplays();
    this.initSelectHeroButton();
    this.initLeaveDungeonButton();
  }

  async initHeroDataDisplays() {
    const heroesContainer = this.shadowRoot.getElementById("heroes-container");
    heroesContainer.innerHTML = "";
    const heroesTemplates = await db.readDB();
    if (!heroesTemplates) return;

    heroesTemplates.forEach((hero, index) => {
      const heroDisplay = new HeroSavedSelectDisplay(
        hero,
        this.selectTemplate,
        index,
        this.deleteTemplate
      );
      if (index === 0) {
        this.selected = hero;
        heroDisplay.addSelectedClass();
      }
      heroesContainer.appendChild(heroDisplay);
      this.heroDisplays.push(heroDisplay);
    });
  }

  initSelectHeroButton() {
    this.shadowRoot
      .getElementById("select-hero-btn")
      .addEventListener("click", () => {
        sfxPlayer.play("CLICK_BTN");

        const consums = this.selected.consumables.map(
          (consumable) => consumables[consumable]
        );
        this.selected.consumables = consums;

        gameSetting.heroData = this.selected;
        gameSetting.hero = heroes[this.selected.entityName];
        this.remove();
        document
          .querySelector("#game-container #game-right-container")
          .appendChild(new SelectLevelPanel());
      });
  }

  deleteTemplate = (id) => {
    db.deleteItem(id);
    this.initHeroDataDisplays();
  };

  selectTemplate = (template, id) => {
    if (template === this.selected) return;
    sfxPlayer.play("CLICK_BTN");
    this.selected = template;

    this.shadowRoot.getElementById("selected-hero").textContent =
      this.selected.entityName;
    this.heroDisplays.forEach((hero) => hero.removeSelectedClass());
    this.heroDisplays[id].addSelectedClass();
  };
}
customElements.define("select-saved-hero-panel", SelecSavedtHeroPanel);
