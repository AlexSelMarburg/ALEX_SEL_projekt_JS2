import { Consumable } from "./Consumable.js";

export class MinorPotion extends Consumable {
  static imgSRC = "assets/img/consumables/minor-potion.png";
  static name = "Minor Potion";
  static scale = 1.5;
  static rarity = "common";
  constructor(owner) {
    super(owner);
    this.sfx = "DRINK_POTION";
    this.effectValue = 6;

    this.description = `Ein kleiner Heiltrank. Stellt <span class="bold-highlight">${this.effectValue}</span>
    Lebenspunkte des Benutzers wieder her.`;
  }

  use() {
    this.owner.takeHealing(this.effectValue);
  }
}

customElements.define("minor-potion", MinorPotion);
