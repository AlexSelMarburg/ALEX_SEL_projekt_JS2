import { BuffDebuff } from "./BuffDebuff.js";

export class FilledPoisonSackBuff extends BuffDebuff {
  static duration = 2;
  static effectValue = 2;
  static name = "Filled poison sack";
  static tooltip = `
    <h3>${FilledPoisonSackBuff.name}:</h3>
    <p>
      Gefüllter Giftbeutel. 
      Attacken fügen zusätzlich <span class="bold-highlight">${FilledPoisonSackBuff.effectValue}</span> Giftschaden zu.
    </p>
  `.trim();

  constructor(target) {
    super(target, FilledPoisonSackBuff.duration);
    this.icon = new Image();
    this.icon.src = "assets/img/buffs/filled-poison-sack.buff.png";
  }

  onAdd() {
    this.target.magicAttack.current += FilledPoisonSackBuff.effectValue;
  }

  onTick() {}

  onRemove() {
    this.target.magicAttack.current -= FilledPoisonSackBuff.effectValue;
  }
}
