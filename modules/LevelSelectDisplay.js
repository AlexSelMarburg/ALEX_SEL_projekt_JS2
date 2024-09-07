import { levels } from "./level/levels.js";

export class LevelSelectDisplay extends HTMLElement {
  static template = document.createElement("template");

  static {
    LevelSelectDisplay.template.innerHTML = /*html*/ `
        <style>     
            * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            }

            #level-container {
            width: 100%;
            height: 235px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            }

            #level-container:hover {
            outline: 3px solid yellow;
            }

            #level-container.selected {
            outline: 2px solid black;
            }

            .portrait-container {
            height: 100%;
            /* background-image: url("../../assets/img/backgrounds/textures/consumable-bg.png"); */
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

            .level-name {
            color: #000;
            font-size: 30px;
            font-weight: 500;
            }

            #level-loot {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 7px;
            }

            #level-loot img {
            height: 100%;
            }

            .level-lore {
            margin-top: 10px;
            font-size: 21px;
            }

        </style>
        <div id="level-container">
            <div class="portrait-container">
                <img
                src="./assets/img/backgrounds/levels/sewers/sewers-1.jpeg"
                alt=""
                class="portrait"
                />
            </div>
            <div class="data-container">
                <h3 class="level-name">Local Sewers</h3>
                <div id="level-loot"></div>
                <p class="level-lore"></p>
            </div>
        </div>
    `;
  }

  constructor(level, id, selectFn) {
    super();
    this.id = id;
    this.selectFn = selectFn;
    this.level = levels[level];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      LevelSelectDisplay.template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    shadow.querySelector(".portrait").src = this.level.selectPanelBackground;
    shadow.querySelector(".level-name").textContent = this.level.title;
    shadow.querySelector(".level-lore").textContent = this.level.description;
    const loot = shadow.querySelector("#level-loot");
    this.level.lootTypes.forEach((item) => {
      const itemElement = document.createElement("img");
      itemElement.src = item.imgSRC;
      loot.appendChild(itemElement);
    });

    const bossLootImage = document.createElement("img");
    bossLootImage.src = this.level.bossLoot.imgSRC;
    loot.appendChild(bossLootImage);

    shadow.querySelector("#level-container").addEventListener("click", () => {
      this.selectFn(this.level, this.id);
    });
  }

  addSelectedClass() {
    this.shadowRoot.querySelector("#level-container").classList.add("selected");
  }

  removeSelectedClass() {
    this.shadowRoot
      .querySelector("#level-container")
      .classList.remove("selected");
  }
}

customElements.define("level-select-display", LevelSelectDisplay);
