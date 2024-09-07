import { sfxPlayer } from "../AudioPlayer.js";

export class Consumable extends HTMLElement {
  static template = document.createElement("template");

  static {
    Consumable.template.innerHTML = /*html*/ `
      <style>
          :host {
            display: block;
            height: 60px;
            width: 60px;
            display:block;
            display: grid;
            place-items: center;
            position: relative;
          }

          .bold-highlight {
            font-weight: 500;
            color: var(--primary-accent-color);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;   
          }

          .item {
            position: relative;
          }

          .item:hover .tooltip {
            display: block;
          }

          img {
            height: 46px;
            object-fit: cover;
            object-fit: fill;
            cursor: pointer;
            transition: all 0.3s ease;

            user-drag: none;
            -webkit-user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;     
          }

          img:hover {
            transform: scale(1.15);
          }

          .tooltip {
            position: absolute;
            width: 350px;
            bottom: 140%;
            left: 50%;
            margin-left: -320px;
            background-color: var(--primary-hero-card-bg-color);
            border: 1px solid var(--tooltip-border-color);
            border-radius: 3px;
            color: #fff;
            padding: 10px;
            display:none;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 300;
          }

          .tooltip h3 {
            color: var(--primary-accent-color);
            font-weight: 300;
            letter-spacing: 2px;
            font-size: 0.72rem;
            text-transform: uppercase;
            margin-bottom: 5px;
          }

          p {
            margin-top: 5px;
          }

          .pointer {
            width: 16px;
            height: 16px;
            background-color: var(--primary-hero-card-bg-color);
            z-index: 0;
            position: absolute;
            bottom: -8px;
            right: 20px;
            transform: rotate(45deg);

            border-right: solid;
            border-bottom: solid;
            border-width: 1px;
            border-color: var(--tooltip-border-color);
          }
      </style>
      <div class="item">
        <img src="" alt="consumable image">
        <div class="tooltip">
          <h3></h3>
          <p>
          </p>
        <div class="pointer"></div>
      </div>
      </div>
    `;
  }

  constructor(owner) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(Consumable.template.content.cloneNode(true));
    this.owner = owner;
    this.type = "consumable";
    this.activeEnemy = false;
  }

  init(slot) {
    const img = this.shadowRoot.querySelector("img");
    img.setAttribute("src", this.constructor.imgSRC);
    this.shadowRoot.querySelector(".tooltip h3").textContent =
      this.constructor.name;
    this.shadowRoot.querySelector(".tooltip p").innerHTML = this.description;
    this.addEventListener("click", function (e) {
      e.stopPropagation();
      if (this.owner.defeated) return;
      this.use(this);
      slot.removeConsumableItem();
      sfxPlayer.play(this.sfx);
    });
  }
}
