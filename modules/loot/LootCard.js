import { LootCardCanvas } from "../canvas/LootCardCanvas.js";

export class LootCard extends HTMLElement {
  static template = document.createElement("template");

  static {
    LootCard.template.innerHTML = /*html*/ `
      <style>
             :host {
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: grab;
             }

             .loot-card {
              height: 220px;
              width: 280px;
              background-color: transparent;
              border-radius: 4px;
              box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px, rgb(51, 51, 51, 0.8) 0px 0px 0px 2px;
             }
  
             @keyframes pop-in-animation {
              0% {
                transform: scale(1.15);
                opacity: 0.5;
              }
              100% {
                transform: scale(1);
                opacity: 1; 
              }
            }
  
            .pop-in {
              animation-name: pop-in-animation;
              animation-duration: 0.55s;
              animation-iteration-count: 1;
            }
  
          </style>
          <div class="loot-card pop-in"></div>
      `.trim();
  }

  constructor(loot) {
    super();
    this.type = "lootCard";
    this.loot = loot;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(LootCard.template.content.cloneNode(true));
    this.canvas = new LootCardCanvas(this);
    this.currentTarget = null;
    this.init();
  }

  set backgroundImageUrl(url) {
    this.canvas.bgImageUrl = url;
  }

  init() {
    this.attachCanvas();
    this.shadowRoot.addEventListener("dblclick", () => {
      this.takeLoot();
    });
  }

  attachCanvas() {
    this.shadowRoot.querySelector(".loot-card").appendChild(this.canvas);
  }

  takeLoot() {
    if (this.currentTarget) {
      this.currentTarget.backpack.addConsumableItem(this.loot);
      this.currentTarget.takeLoot();
      this.remove();
    }
  }
}

customElements.define("loot-card", LootCard);
