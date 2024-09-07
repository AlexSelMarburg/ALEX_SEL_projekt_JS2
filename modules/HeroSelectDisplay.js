import { heroes } from "./Hero/heroes.js";

export class HeroSelectDisplay extends HTMLElement {
  static template = document.createElement("template");

  static {
    HeroSelectDisplay.template.innerHTML = /*html*/ `
        <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .hero-container {
          width: 100%;
          height: 235px;
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
          gap: 5px;
        }

        .hero-name {
          color: #000;
          font-size: 30px;
          font-weight: 500;
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
          height: 32px;
        }

        .stat p {
          font-size: 26px;
        }

        .hero-lore {
          margin-top: 10px;
          font-size: 21px;
        }

        .right-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 7px;
        }

        .hero-data {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .right-container img {
          height: 65px;
          border-radius: 5px;
        }
        </style>
        <div class="hero-container">
          <div class="portrait-container">
            <img src="" alt="" class="portrait" />
          </div>
          <div class="data-container">
            <h3 class="hero-name"></h3>
            <div class="hero-data">
              <div class="left-container">
                <h3 class="hero-class"></h3>
                <div class="stats-container">
                  <div class="stat">
                    <img src="./assets/img/HUD/heart.png" alt="HP Icon" />
                    <p id="hp">12</p>
                  </div>
                  <div class="stat">
                    <img src="./assets/img/HUD/swords-crossed.png" alt="Attack Icon" />
                    <p id="attack">12</p>
                  </div>
                  <div class="stat">
                    <img src="./assets/img/HUD/shield.png" alt="Armor Icon" />
                    <p id="armor">12</p>
                  </div>
                </div>
              </div>
              <div class="right-container"></div>
            </div>
            <p class="hero-lore">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
              fugit inventore quia molestias excepturi consectetur quos. Facilis
              commodi nesciunt aperiam inventore, voluptas debitis ipsam!
            </p>
          </div>
        </div>
    `;
  }

  constructor(hero, id, selectFn) {
    super();
    this.id = id;
    this.selectFn = selectFn;
    this.hero = heroes[hero];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      HeroSelectDisplay.template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    shadow.querySelector(".portrait").src = this.hero.data.portraitImage;
    shadow.querySelector(".hero-name").textContent = this.hero.data.entityName;
    shadow.querySelector(".hero-class").textContent = this.hero.data.className;
    shadow.querySelector("#hp").textContent = this.hero.data.hp;
    shadow.querySelector("#attack").textContent = this.hero.data.attack;
    shadow.querySelector("#armor").textContent = this.hero.data.armor;

    shadow.querySelector(".hero-container").addEventListener("click", () => {
      this.selectFn(this.hero, this.id);
    });

    const abilitiesContainer = shadow.querySelector(".right-container");
    this.hero.data.abilities.forEach((ability) => {
      const abilityElement = document.createElement("img");
      abilityElement.src = `assets/img/abilities/${ability.imgUrl}`;
      abilitiesContainer.appendChild(abilityElement);
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

customElements.define("hero-select-display", HeroSelectDisplay);
