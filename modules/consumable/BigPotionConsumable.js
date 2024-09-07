import { Consumable } from "./Consumable.js";

export class BigPotion extends Consumable {
  static imgSRC = "assets/img/consumables/big-potion.png";
  static name = "Big Potion";
  static scale = 2.5;
  static rarity = "rare";
  constructor(owner) {
    super(owner);
    this.sfx = "DRINK_POTION";
    this.effectValue = 15;

    this.description = `Ein grosser Heiltrank. Stellt <span class="bold-highlight">${this.effectValue}</span>
    Lebenspunkte des Benutzers wieder her.`;
  }

  use() {
    this.owner.takeHealing(this.effectValue);
  }
}

customElements.define("big-potion", BigPotion);
