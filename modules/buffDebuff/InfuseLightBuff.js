import { BuffDebuff } from "./BuffDebuff.js";

export class InfuseLightBuff extends BuffDebuff {
  static duration = 3;
  static effectValue = 2;
  static name = "Infuse Light";
  static tooltip = `
    <h3>${InfuseLightBuff.name}:</h3>
    <p>
      Heilige Energie durchfließt für <span class="bold-highlight">${InfuseLightBuff.duration}</span> Runden den Hammer,
      wodurch dieser zusätzlich <span class="bold-highlight">${InfuseLightBuff.effectValue}</span> Schaden zufügt.
    </p>
  `.trim();

  constructor(target) {
    super(target, InfuseLightBuff.duration);
    this.icon = new Image();
    this.icon.src = "assets/img/buffs/infuse-light-buff.png";
  }

  onAdd() {
    this.target.magicAttack.current += InfuseLightBuff.effectValue;
  }

  onTick() {
    // No additional action on tick
  }

  onRemove() {
    this.target.magicAttack.current -= InfuseLightBuff.effectValue;
  }
}
