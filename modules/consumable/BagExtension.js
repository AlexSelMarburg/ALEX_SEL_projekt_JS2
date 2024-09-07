import { Consumable } from "./Consumable.js";

export class BagExtension extends Consumable {
  static imgSRC = "assets/img/consumables/bag-extension.png";
  static name = "Bag Extension";
  static scale = 2.5;
  static rarity = "rare";
  constructor(owner) {
    super(owner);
    this.sfx = "PUT_IN_BAG";
    this.effectValue = 1;

    this.description = `Erweitert die Anzahl der Quickslots der Tasche um<span class="bold-highlight">${this.effectValue}</span>.`;
  }

  use() {
    this.owner.backpack.addQuickSlot();
  }
}

customElements.define("bag-extension", BagExtension);
