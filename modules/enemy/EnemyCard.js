import { EnemyCardCanvas } from "../canvas/EnemyCardCanvis.js";
import { sfxPlayer } from "../AudioPlayer.js";
import { delay } from "../lib/utils.js";

export class EnemyCard extends HTMLElement {
  static template = document.createElement("template");

  static {
    EnemyCard.template.innerHTML = /*html*/ `
    <style>
           .enemy-card {
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

          .enemy-card.active {
            box-shadow: rgb(0, 0, 0, 0.7) 0px 0px 0px 6px !important; 
          }

          .pop-in {
            animation-name: pop-in-animation;
            animation-duration: 0.55s;
            animation-iteration-count: 1;
          }

        </style>
        <div class="enemy-card pop-in"></div>
    `.trim();
  }

  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(EnemyCard.template.content.cloneNode(true));
    data.img = this.getRandomEntityImage(data);
    this.canvas = new EnemyCardCanvas(data, this);
    this.type = "enemy";
    this.buffsDebuffs = [];
    this.currentTarget = null;
    this.abilities = [];
    this.initializeAbilities(data);
    this.init();
    this.loot = null;
    this.activeEnemy = false;
  }

  setCanPerformAction(value) {
    this.isGlowing = value;
    this.activeCard = value;
  }

  set activeCard(value) {
    const card = this.shadowRoot.querySelector(".enemy-card");
    if (value) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  }

  initializeAbilities(data) {
    data.abilities.forEach((ability) => this.abilities.push(new ability(this)));
  }

  set backgroundImageUrl(url) {
    this.canvas.bgImageUrl = url;
  }

  getRandomEntityImage(settings) {
    return `${settings.imgURL}${
      settings.imgsArr[Math.floor(Math.random() * settings.imgsArr.length)]
    }`;
  }

  init() {
    this.attachCanvas();
  }

  attachCanvas() {
    this.shadowRoot.querySelector(".enemy-card").appendChild(this.canvas);
  }

  addBuffDebuff(buffDebuff) {
    const instance = new buffDebuff(this);
    this.buffsDebuffs.push(instance);
    this.buffsDebuffs.sort((a, b) => a.currentDuration - b.currentDuration);
    instance.init();
  }

  updateAbilityCooldownDisplay() {
    this.abilities.forEach((ability) => ability.updateCurrentCooldown());
  }

  async updateBuffsDebuffs() {
    for (const buffDebuff of this.buffsDebuffs) {
      buffDebuff.tick();
      if (buffDebuff.currentDuration <= 0) {
        this.buffsDebuffs.splice(this.buffsDebuffs.indexOf(buffDebuff), 1);
      }
      await delay(buffDebuff.tickDelay);
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
    let damage = value;
    if (this.armor.current >= value) {
      sfxPlayer.play("BLOCKED");
      damage = 0;
    } else {
      damage -= this.armor.current;
    }

    this.hp.current -= damage;
    this.canvas.takeDamage(damage);
    if (this.isDead) this.setDeadImage();
  }

  takeMagicDamage(value) {
    this.hp.current -= value;
    this.canvas.takeMagicDamage(value);
    if (this.isDead) this.setDeadImage();
  }

  setDeadImage() {
    this.canvas.entityImgSrc = "assets/img/HUD/death-icon.png";
  }

  get isDead() {
    if (this.hp.current <= 0) {
      this.hp.current = 0;
      if (this.constructor.sfxOnDeath) {
        sfxPlayer.play(this.constructor.sfxOnDeath);
      } else {
        sfxPlayer.play("ENEMY_DEATH");
      }
      return true;
    }
    return false;
  }

  async useReadyAbility() {
    let abilityToUse;
    const abilities = this.abilities;

    for (let i = abilities.length - 1; i >= 0; i--) {
      if (abilities[i].currentCooldown === 0) {
        abilityToUse = abilities[i];
        break;
      }
    }

    await delay(abilityToUse.delay);
    abilityToUse.use();
  }
}
