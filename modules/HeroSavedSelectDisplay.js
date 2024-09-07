import { heroes } from "./Hero/heroes.js";
import { consumables } from "./consumable/consumables.js";

export class HeroSavedSelectDisplay extends HTMLElement {
  static template = document.createElement("template");

  static {
    HeroSavedSelectDisplay.template.innerHTML = /*html*/ `
        <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        :host {
          width: 100%;
        }
        
        .hero-container {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .hero-container:hover {
          outline: 3px solid yellow;
        }

        .hero-container.selected {
          outline: 2px solid black;
        }

        .portrait-container {
          height: 100%;
          background-image: url("../../assets/img/backgrounds/textures/consumable-bg.png");
        }

        img.portrait {
          height: 100%;
          border: 2px solid #000;
        }

        .data-container {
          background-image: url("../../assets/img/backgrounds/textures/hero-data-background.jpeg");
          background-repeat: no-repeat;
          background-size: cover;
          height: 100%;
          width: 100%;
          border: 2px solid #000;
          border-left: none;
          padding: 5px 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 5px;
        }

        h3 {
          color: #000;
          font-size: 30px;
          font-weight: 500;
        }

        .data-container > h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h3 img{
          height: 38px;
          border-radius: 5px
        }

        h3 img:hover{
          outline: 3px solid red;
        }

        .hero-class {
          color: darkslategrey;
          margin: 10px 0 5px;
          font-size: 18px;
          font-weight: 500;
          font-family: "Press Start 2P";
        }

        .stats-container {
          display: flex;
          gap: 10px;
        }

        .stat {
          display: flex;
          align-items: flex-end;
          min-width: 60px;
          gap: 5px;
          font-family: "Press Start 2P";
        }

        .stat img {
          height: 22px;
        }

        .stat p {
          font-size: 20px;
        }

        .bottom-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 7px;
          width: 100%;
          height: 100%;
        }

        .hero-data {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .bottom-container img {
          height: 45px;
          border-radius: 5px;
        }
        </style>
        <div class="hero-container">
          <div class="portrait-container">
            <img src="" alt="" class="portrait" />
          </div>
          <div class="data-container">
            <h3><span class="hero-name"></span> <img src="assets/img/HUD/deleteBtn.png" alt="" id="delete-btn"></h3>
            <div class="hero-data">
              <div class="top-container">
                <h3 class="hero-class"></h3>
                <div class="stats-container">
                  <div class="stat">
                    <img src="./assets/img/HUD/heart.png" alt="HP Icon" />
                    <p id="hp"></p>
                  </div>
                  <div class="stat">
                    <img src="./assets/img/HUD/swords-crossed.png" alt="Attack Icon" />
                    <p id="attack"></p>
                  </div>
                  <div class="stat">
                    <img src="./assets/img/HUD/shield.png" alt="Armor Icon" />
                    <p id="armor"></p>
                  </div>
                </div>
              </div>
              <div class="bottom-container"></div>
            </div>
      
          </div>
        </div>
    `;
  }

  constructor(hero, selectFn, index, deleteFn) {
    super();
    this.selectFn = selectFn;
    this.deleteFn = deleteFn;
    this.hero = hero;
    this.id = index;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      HeroSavedSelectDisplay.template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    shadow.querySelector(".portrait").src =
      heroes[this.hero.entityName].data.portraitImage;
    shadow.querySelector(".hero-name").textContent = this.hero.entityName;
    shadow.querySelector(".hero-class").textContent =
      heroes[this.hero.entityName].data.className;
    shadow.querySelector("#hp").textContent = this.hero.hp.max;
    shadow.querySelector("#attack").textContent = this.hero.attack.max;
    shadow.querySelector("#armor").textContent = this.hero.armor.max;

    shadow.querySelector(".hero-container").addEventListener("click", () => {
      this.selectFn(this.hero, this.id);
    });

    const bottomContainer = shadow.querySelector(".bottom-container");
    this.hero.consumables.forEach((consumable) => {
      const consumableElement = document.createElement("img");
      consumableElement.src = consumables[consumable].imgSRC;
      bottomContainer.appendChild(consumableElement);
    });

    const deleteBtn = shadow.querySelector("#delete-btn");
    deleteBtn.addEventListener("click", () => {
      this.deleteFn(this.hero.id);
    });
  }

  addSelectedClass() {
    this.shadowRoot.querySelector(".hero-container").classList.add("selected");
  }

  removeSelectedClass() {
    this.shadowRoot
      .querySelector(".hero-container")
      .classList.remove("selected");
  }
}

customElements.define("hero-saved-select-display", HeroSavedSelectDisplay);
