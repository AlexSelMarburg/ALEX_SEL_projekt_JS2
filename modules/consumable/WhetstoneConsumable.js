import { SharpenedWeaponBuff } from "../buffDebuff/SharpenedWeaponBuff.js";
import { Consumable } from "./Consumable.js";

export class Whetstone extends Consumable {
  static imgSRC = "assets/img/consumables/whetstone.png";
  static name = "Whet-stone";
  static scale = 1.5;
  static rarity = "common";
  constructor(owner) {
    super(owner);
    this.sfx = "SHARPEN_WEAPON";
    this.effectValue = 2;

    this.description = `Ein kleiner Schleifstein. Schärft die Waffe und erhöht den Angriffsschaden für <span class="bold-highlight">${SharpenedWeaponBuff.duration}</span> Runden um <span class="bold-highlight">${SharpenedWeaponBuff.effectValue}</span> Punkt.`;
  }

  use() {
    this.owner.addBuffDebuff(SharpenedWeaponBuff);
  }
}

customElements.define("whet-stone", Whetstone);
