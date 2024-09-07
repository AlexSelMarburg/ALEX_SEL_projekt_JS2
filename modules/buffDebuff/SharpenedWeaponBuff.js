import { BuffDebuff } from "./BuffDebuff.js";

export class SharpenedWeaponBuff extends BuffDebuff {
  static duration = 4;
  static effectValue = 1;
  static name = "Sharpened Weapon";
  static tooltip = `
    <h3>${SharpenedWeaponBuff.name}:</h3>
    <p>
      Die Waffe is geschärft, Die Angriffskraft ist für <span class="bold-highlight">${SharpenedWeaponBuff.duration}</span> um <span class="bold-highlight">${SharpenedWeaponBuff.effectValue}</span> ehöht.
    </p>
  `.trim();

  constructor(target) {
    super(target, SharpenedWeaponBuff.duration);
    this.icon = new Image();
    this.icon.src = "assets/img/buffs/sharpened-weapon.png";
  }

  onAdd() {
    this.target.attack.current += SharpenedWeaponBuff.effectValue;
  }

  onTick() {}

  onRemove() {
    this.target.attack.current -= SharpenedWeaponBuff.effectValue;
  }
}
