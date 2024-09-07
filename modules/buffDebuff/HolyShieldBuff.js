import { BuffDebuff } from "./BuffDebuff.js";

export class HolyShieldBuff extends BuffDebuff {
  static duration = 3;
  static effectValue = 1;
  static healValuePerTick = 1;
  static name = "Holy Shield";
  static tooltip = `
    <h3>${HolyShieldBuff.name}:</h3>
    <p>
      Erhöht die Rüstung für <span class="bold-highlight">${HolyShieldBuff.duration}</span> Runden um <span class="bold-highlight">${HolyShieldBuff.effectValue}</span>.
      Heilt den Templar um <span class="bold-highlight">${HolyShieldBuff.healValuePerTick}</span> HP pro Runde.
    </p>
  `.trim();

  constructor(target) {
    super(target, HolyShieldBuff.duration);
    this.sfx = "HEAL";
    this.icon = new Image();
    this.icon.src = "assets/img/buffs/holy-shield-buff.png";
    this.tickDelay = 1000;
  }

  onAdd() {
    this.target.armor.current += HolyShieldBuff.effectValue;
  }

  onTick() {
    this.target.takeHealing(HolyShieldBuff.healValuePerTick);
  }

  onRemove() {
    this.target.armor.current -= HolyShieldBuff.effectValue;
  }
}
