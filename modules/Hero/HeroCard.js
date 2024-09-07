import { HeroCardCanvas } from "../canvas/HeroCardCanvas.js";
import { Backpack } from "./Backpack.js";
import { sfxPlayer } from "../AudioPlayer.js";
import { delay } from "../lib/utils.js";

export class HeroCard extends HTMLElement {
  static template = document.createElement("template");

  static {
    HeroCard.template.innerHTML = /*html*/ `
      <style>
        @keyframes pop-in-animation {
          0% {
            transform: scale(1.1);
            opacity: 0.45;
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

        #hero-card {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: transparent;
          width: 280px;
          height: 324px;
          perspective: 1000px;
          border-radius: 4px;
          cursor: grab;
        }

        #hero-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.45s;
          transform-style: preserve-3d;
          border-radius: inherit;
        }

        .flip-card {
          transform: rotateY(180deg);
        }

        #hero-card-front,
        #hero-card-back {
          background-color: var(--primary-hero-card-bg-color);
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: inherit;

          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px, rgb(51, 51, 51, 0.8) 0px 0px 0px 2px;
        }

        #hero-card.active #hero-card-front,  #hero-card.active #hero-card-back {
          box-shadow: rgb(247, 198, 0) 0px 0px 0px 3px !important; 
        }

        #hero-card-back {
          display: grid;
          place-items: center;
        }

        #hero-card-front {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        #hero-card-front .card-upper {
          height: 264px;
          width: 100%;
        }

        #hero-card-front .card-lower {
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        #hero-backpack-container {
          height: 100%;
          width: 56px;
          display: grid;
          place-items: center;
        }

        #hero-card .hero-abilities {
          padding: 0 7px 0 0;
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #hero-card-back {
          transform: rotateY(180deg);
        }

        #btn-flip-back {
          padding: 10px;
          cursor: pointer;
        }
      </style>

      <div id="hero-card" class="pop-in" draggable="true">
        <div id="hero-card-inner">
          <div id="hero-card-front">
            <div class="card-upper"></div>
            <div class="card-lower">
              <div id="hero-backpack-container"></div>
              <div class="hero-abilities"></div>
            </div>
          </div>
          <div id="hero-card-back">
            <button id="btn-flip-back">flip</button>
          </div>
        </div>
      </div>
    `;
  }

  constructor(settings, heroData) {
    super();
    this.abilities = [];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(HeroCard.template.content.cloneNode(true));
    this.backpack = new Backpack(this, heroData);
    this.canvas = new HeroCardCanvas(settings, this);
    this.type = "hero";
    this.buffsDebuffs = [];
    this.currentTarget = null;
    this.position = null;
    this.canMove = false;
    this.canPerformAction = false;
    this.init(settings.abilities);
    this.endHeroTurn = null;
    this.id = heroData?.id ?? window.crypto.randomUUID();
  }

  initFlipCardBack() {
    this.shadowRoot
      .querySelector("#btn-flip-back")
      .addEventListener("click", () => {
        this.shadowRoot
          .querySelector("#hero-card-inner")
          .classList.remove("flip-card");
      });
  }

  createHeroSaveData(slots) {
    function getItemsInstanceNames(slots) {
      const items = [];
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        if (slot.item) {
          items.push(slot.item.constructor.name);
        }
      }

      return items;
    }

    const data = {
      hp: this.initializeAttribute(undefined, this.hp.max),
      armor: this.initializeAttribute(undefined, this.armor.max),
      attack: this.initializeAttribute(undefined, this.attack.max),
      magicAttack: this.initializeAttribute(undefined, this.magicAttack.max),
      backpackSlots: this.backpack.backpackSlots,
      consumables: getItemsInstanceNames(this.backpack.slots),
      entityName: this.constructor.data.entityName,
      id: this.id,
    };

    return data;
  }

  init(abilities) {
    this.attachCanvas();
    this.attachBackpack();
    this.initializeAbilities(abilities);
    this.setCanMove(this.canMove);
    this.addHeroCardEventListeners();
    this.initFlipCardBack();
  }

  initializeAttribute(attributeData, defaultValue) {
    return (
      attributeData ?? {
        current: defaultValue,
        max: defaultValue,
      }
    );
  }

  updateAbilityCooldownDisplay() {
    this.abilities.forEach((ability) => ability.updateCurrentCooldown());
  }

  set backgroundImageUrl(url) {
    this.canvas.bgImageUrl = url;
  }

  setCanMove(value) {
    this.canMove = value;
    this.canvas.canMove = value;
  }

  setCanPerformAction(value) {
    this.canPerformAction = value;
    this.isGlowing = value;
    this.activeCard = value;
  }

  attachCanvas() {
    this.shadowRoot.querySelector(".card-upper").appendChild(this.canvas);
  }

  attachBackpack() {
    this.shadowRoot
      .querySelector("#hero-backpack-container")
      .appendChild(this.backpack);
  }

  addHeroCardEventListeners() {
    let initialContainer = null;

    this.addEventListener("dragstart", (e) => {
      if (!this.canMove) return;
      initialContainer = e.target.parentElement;
    });

    this.addEventListener("dragend", (e) => {
      if (!this.canMove) return;
      const finalContainer = e.target.parentElement;
      this.position = finalContainer.getAttribute("data-pos");

      if (initialContainer !== finalContainer) {
        this.endHeroTurn();
      }
    });
  }

  set activeCard(value) {
    const card = this.shadowRoot.querySelector("#hero-card");
    if (value) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  }

  initializeAbilities(abilityClasses) {
    const abilitiesContainer = this.shadowRoot.querySelector(".hero-abilities");
    abilityClasses.forEach((ability, index) => {
      const skill = new ability(index, this);
      this.abilities.push(skill);
      abilitiesContainer.appendChild(skill);
    });
  }

  addBuffDebuff(buffDebuff) {
    const instance = new buffDebuff(this);
    this.buffsDebuffs.push(instance);
    this.buffsDebuffs.sort((a, b) => a.currentDuration - b.currentDuration);
    instance.init();
  }

  async updateBuffsDebuffs() {
    for (const buffDebuff of this.buffsDebuffs) {
      await delay(buffDebuff.tickDelay);
      buffDebuff.tick();
      if (buffDebuff.currentDuration <= 0) {
        this.buffsDebuffs.splice(this.buffsDebuffs.indexOf(buffDebuff), 1);
      }
    }
  }

  set isGlowing(value) {
    this.canvas.isGlowing = value;
  }

  takeHealing(value) {
    let healAmount = value;
    if (this.hp.current + value > this.hp.max) {
      healAmount = this.hp.max - this.hp.current;
      this.hp.current = this.hp.max;
    } else {
      this.hp.current += value;
    }
    this.canvas.takeHealing(healAmount);
  }

  takeDamage(value) {
    if (this.defeated) return;
    let damage = value;
    if (this.armor.current >= value) {
      sfxPlayer.play("BLOCKED");
      damage = 0;
    } else {
      damage -= this.armor.current;
    }

    this.hp.current -= damage;
    this.canvas.takeDamage(damage);
    this.isDead;
  }

  takeMagicDamage(value) {
    if (this.defeated) return;
    this.hp.current -= value;
    this.canvas.takeMagicDamage(value);
    this.isDead;
  }

  get defeated() {
    return this.hp.current <= 0;
  }

  get isDead() {
    if (this.defeated) {
      this.hp.current = 0;
      this.canvas.entityImgSrc = "assets/img/HUD/death-icon.png";
      sfxPlayer.play(this.deathSFX);
      return true;
    }
    return false;
  }
}
