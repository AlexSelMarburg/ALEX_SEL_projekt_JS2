import { BuffDebuff } from "./BuffDebuff.js";

export class DragonsRoarBuff extends BuffDebuff {
  static duration = 4;
  static effectValue = 2;
  static name = "Dragons Roar";
  static tooltip = `
    <h3>${DragonsRoarBuff.name}:</h3>
    <p>
      Adrenalin für <span class="bold-highlight">${DragonsRoarBuff.duration}</span> Runden erhöht.
      Angriffskraft um <span class="bold-highlight">${DragonsRoarBuff.effectValue}</span> ehöht.
    </p>
  `.trim();

  constructor(target) {
    super(target, DragonsRoarBuff.duration);
    this.icon = new Image();
    this.icon.src = "assets/img/abilities/ability-dragons-roar.jpeg";
  }

  onAdd() {
    this.target.attack.current += DragonsRoarBuff.effectValue;
  }

  onTick() {}

  onRemove() {
    this.target.attack.current -= DragonsRoarBuff.effectValue;
  }
}
