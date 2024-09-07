import { sfxPlayer } from "../AudioPlayer.js";

export class HeroAbility extends HTMLElement {
  static template = document.createElement("template");

  static {
    this.template.innerHTML = /*html*/ `
      <style>
        .bold-highlight {
          font-weight: 500;
          color: var(--primary-accent-color);
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .ability-container {
          height: 50px;
          width: 50px;
          border: 2px solid var(--tooltip-border-color);
          border-radius: 3px;
        }

        .ability-container:hover {
          border-color: var(--primary-accent-color);
        }

        .ability {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          border-radius: inherit;
          cursor: pointer;
        }

        .ability img {
          height: 100%;
          border-radius: inherit;

          user-drag: none;
            -webkit-user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }

        .ability-overlay {
          position: absolute;
          color: var(--primary-text-color);
          background-color: var(--accent-bg-color);
          border-radius: inherit;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          display: none;
        }

        .ability-overlay.active {
          display: flex;
        }

        .ability-tooltip {
          width: 320px;
          left: 50%;
          margin-left: 209px;
          bottom: -4px;
          z-index: 5;
          background-color: var(--primary-hero-card-bg-color);
          color: var(--primary-text-color);
          letter-spacing: 1px;
          text-align: left;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 300;
          border-radius: 6px;
          padding: 10px;
          position: absolute;
          border: 1px solid var(--tooltip-border-color);
          display: none;
        }
        .ability-container[id="1"] .ability .ability-tooltip {
          margin-left: 154px;
        }
        .ability-container[id="2"] .ability .ability-tooltip {
          margin-left: 98px;
        }
        .ability-container[id="3"] .ability .ability-tooltip {
          margin-left: 42px;
        }
     
        .ability-tooltip .highlight {
          color: aqua;
        }
        .ability-tooltip h3 {
          color: var(--primary-accent-color);
          font-weight: 400;
          letter-spacing: 2px;
          font-size: 0.72rem;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        p {
          margin-top: 5px;
        }
        .ability-pointer {
          width: 14px;
          height: 14px;
          background-color: inherit;
          z-index: 0;
          position: absolute;
          bottom: 12px;
          left: 0;
          transform: translate(-50%, 0) rotate(45deg);
          border-left: solid 1px var(--tooltip-border-color);
          border-bottom: solid 1px var(--tooltip-border-color);
        }

        .ability:hover .ability-tooltip {
          display: block;
        }

      </style>

      <div class="ability-container">
        <div class="ability">
          <img src="" alt="" class="ability-img" />
          <div class="ability-overlay"></div>
          <div class="ability-tooltip">
            <h3 id="title"></h3>
            <p class="highlight">
              Cooldown: <span id="current-cooldown"></span> | <span id="total-cooldown">5</span>
            </p>
            <p id="tooltip-info"></p>
            <div class="ability-pointer"></div>
          </div>
        </div>
      </div>
    `;
  }

  constructor(id, user) {
    super();
    this.id = id;
    this.user = user;
    this.currentCooldown = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(HeroAbility.template.content.cloneNode(true));
  }

  init() {
    const shadow = this.shadowRoot;
    shadow.querySelector(".ability-container").id = this.id;
    shadow.querySelector("#title").textContent = this.abilityTitle;
    shadow.querySelector("#tooltip-info").innerHTML = this.tooltipHTML();
    shadow.querySelector(
      ".ability-img"
    ).src = `assets/img/abilities/${this.img}`;
    shadow.querySelector("#current-cooldown").textContent =
      this.currentCooldown;
    shadow.querySelector("#total-cooldown").textContent = this.cooldown;
    shadow.querySelector(".ability-overlay").textContent = this.currentCooldown;

    shadow
      .querySelector(".ability")
      .addEventListener("click", () => this.use());
  }

  get isTargetConsumable() {
    return this.Consumable;
  }

  get canBeUsed() {
    return !this.isOnCooldown && this.user.canPerformAction;
  }

  use() {
    sfxPlayer.play(this.sfx);
    this.currentCooldown = this.cooldown;
    this.shadowRoot.querySelector(".ability-overlay").classList.add("active");
    this.update();
    this.user.endHeroTurn();
  }

  update() {
    this.shadowRoot.querySelector("#current-cooldown").textContent =
      this.currentCooldown;
    this.shadowRoot.querySelector(".ability-overlay").textContent =
      this.currentCooldown;
  }

  updateCurrentCooldown() {
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
      this.update();
      if (this.currentCooldown === 0) {
        this.shadowRoot
          .querySelector(".ability-overlay")
          .classList.remove("active");
      }
    }
  }

  get isOnCooldown() {
    return this.currentCooldown > 0;
  }
}
