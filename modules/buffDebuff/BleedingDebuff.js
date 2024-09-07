import { BuffDebuff } from "./BuffDebuff.js";

export class BleedingDebuff extends BuffDebuff {
  static duration = 4;
  static effectValue = 1;
  static name = "Bleeding";
  static tooltip = `
    <h3>${BleedingDebuff.name}:</h3>
    <p>
      Blutet <span class="bold-highlight">${BleedingDebuff.duration}</span> Runden für <span class="bold-highlight">${BleedingDebuff.effectValue}</span> puren Schaden.
    </p>
  `.trim();

  constructor(target) {
    super(target, BleedingDebuff.duration);
    this.sfx = "BLEED";
    this.icon = new Image();
    this.icon.src = "assets/img/debuff/bleeding-debuff.png";
    this.tickDelay = 1000;
  }

  onTick() {
    this.target.takeMagicDamage(BleedingDebuff.effectValue);
  }
}
