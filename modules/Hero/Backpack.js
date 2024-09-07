import { sfxPlayer } from "../AudioPlayer.js";
import { ConsumableSlot } from "./ConsumableSlot.js";

export class Backpack extends HTMLElement {
  static template = document.createElement("template");

  static {
    Backpack.template.innerHTML = /*html*/ `
      <style>
        #hero-backpack {
          position: relative;
          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #hero-backpack img {
          object-fit: contain;
          width: 36px;
          transition: transform 0.3s ease;

          user-drag: none;
            -webkit-user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }

        #hero-backpack:hover img {
          transform: scale(1.15);
          cursor: pointer;
        }

        #consumables {
          box-sizing: border-box;
          border-radius: 5px;
          padding: 4px;
          position: absolute;
          z-index: 2;
          right: 125%;
          display: none;
          gap: 4px;
          transition: all 0.3s ease;
          height: 72px;
          bottom: -12px;
          background-color: var(--primary-hero-card-bg-color);
          border: 1px solid var(--tooltip-border-color);
          justify-content: space-between;
          align-items: center;
        }

        #hero-backpack:hover #consumables {
          display: flex;
          cursor: default;
        }

        .bag-pointer {
          width: 26px;
          height: 26px;
          background-color: var(--primary-hero-card-bg-color);
          z-index: 1;
          position: absolute;
          bottom: 6px;
          right: -14px;
          transform: translate(0, -50%) rotate(45deg);
          border-right: 1px solid var(--tooltip-border-color);
          border-top: 1px solid var(--tooltip-border-color);
        }
      </style>
      <div id="hero-backpack">
        <div id="consumables">
          <div class="bag-pointer"></div>
        </div>
        <img src="assets/img/HUD/sack.png" id="backpack-img" alt="Backpack" />
      </div>
    `;
  }

  constructor(card, heroData) {
    super();
    this.card = card;
    this.backpackSlots = heroData?.backpackSlots ?? 2;
    this.heroData = heroData;
    this.slots = [];
    this.maxSlots = 6;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(Backpack.template.content.cloneNode(true));
    this.init();
  }

  disconnectedCallback() {
    this.backpackImg.removeEventListener("click", this.handleBackpackClick);
  }

  init() {
    this.backpackImg = this.shadowRoot.querySelector("#backpack-img");
    this.initializeSlots();

    if (this.heroData) {
      this.heroData.consumables.forEach((item) => {
        this.addConsumableItem(item);
      });
    }
    // TODO: Keine Zeit!!!
    this.backpackImg.addEventListener(
      "click",
      this.handleBackpackClick.bind(this)
    );
  }

  // TODO: Leider ist die Implementierung der Fatures auf der Rückseite der Heldenkarte
  // im gegebenem Zeitramen für das Projekt nicht möglich
  handleBackpackClick() {
    this.card.shadowRoot
      .querySelector("#hero-card-inner")
      .classList.add("flip-card");
  }

  addQuickSlot() {
    if (this.backpackSlots >= this.maxSlots) return;
    this.backpackSlots++;
    const slot = new ConsumableSlot(this.backpackSlots.length - 1, this.card);
    this.slots.push(slot);
    this.shadowRoot.querySelector("#consumables").appendChild(slot);
  }

  initializeSlots() {
    const consumablesContainer = this.shadowRoot.querySelector("#consumables");
    for (let i = 0; i < this.backpackSlots; i++) {
      const slot = new ConsumableSlot(i, this.card);
      this.slots.push(slot);
      consumablesContainer.appendChild(slot);
    }
  }

  hasEmptySlot() {
    const emptySlot = this.slots.find((slot) => slot.item === null);
    if (emptySlot) return emptySlot;

    return null;
  }

  addConsumableItem(item) {
    const emptySlot = this.hasEmptySlot();
    if (emptySlot) {
      emptySlot.addConsumableItem(item);
      sfxPlayer.play("PUT_IN_BAG");
    } else {
      const consumable = new item(this.card);
      sfxPlayer.play(consumable.sfx);
      consumable.use();
    }
  }
}

customElements.define("hero-backpack", Backpack);
