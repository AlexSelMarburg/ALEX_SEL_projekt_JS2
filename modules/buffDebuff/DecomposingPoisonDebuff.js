import { BuffDebuff } from "./BuffDebuff.js";

export class DecomposingPoisonDebuff extends BuffDebuff {
  static duration = 4;
  static effectValue = 1;
  static name = "Decomposing poison";
  static tooltip = `
    <h3>${DecomposingPoisonDebuff.name}:</h3>
    <p>
      Blutet <span class="bold-highlight">${DecomposingPoisonDebuff.duration}</span> Runden für <span class="bold-highlight">${DecomposingPoisonDebuff.effectValue}</span> puren Schaden.
    </p>
  `.trim();

  constructor(target) {
    super(target, DecomposingPoisonDebuff.duration);
    this.sfx = "BLEED";
    this.icon = new Image();
    this.icon.src = "assets/img/debuff/decomposing-poison.jpeg";
    this.tickDelay = 1000;
  }

  onTick() {
    this.target.armor.current -= DecomposingPoisonDebuff.effectValue;
  }

  onRemove() {
    this.target.armor.current = this.target.armor.max;
  }
}
