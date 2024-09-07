import { BuffDebuff } from "./BuffDebuff.js";

export class ScaredDebuff extends BuffDebuff {
  static duration = 2;
  static effectValue = 2;
  static name = "Scared";
  static tooltip = `
    <h3>${ScaredDebuff.name}:</h3>
    <p>
      Eingeschüchtert. Die Angriffskraft ist für <span class="bold-highlight">${ScaredDebuff.duration}</span> um <span class="bold-highlight">${ScaredDebuff.effectValue}</span> reduziert.
    </p>
  `.trim();

  constructor(target) {
    super(target, ScaredDebuff.duration);
    this.icon = new Image();
    this.icon.src = "assets/img/buffs/scared-debuff.jpeg";
  }

  onAdd() {
    this.target.attack.current -= ScaredDebuff.effectValue;
  }

  onTick() {}

  onRemove() {
    this.target.attack.current += ScaredDebuff.effectValue;
  }
}
