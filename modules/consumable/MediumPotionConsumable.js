import { Consumable } from "./Consumable.js";

export class MediumPotion extends Consumable {
  static imgSRC = "assets/img/consumables/medium-potion.png";
  static name = "Medium Potion";
  static scale = 2;
  static rarity = "uncommon";
  constructor(owner) {
    super(owner);
    this.sfx = "DRINK_POTION";
    this.effectValue = 10;

    this.description = `Ein Heiltrank. Stellt <span class="bold-highlight">${this.effectValue}</span>
    Lebenspunkte des Benutzers wieder her.`;
  }

  use() {
    this.owner.takeHealing(this.effectValue);
  }
}

customElements.define("medium-potion", MediumPotion);
