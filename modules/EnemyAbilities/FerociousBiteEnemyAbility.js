import { BleedingDebuff } from "../buffDebuff/BleedingDebuff.js";
import { EnemyAbility } from "./EnemyAbility.js";

export class FerociousBiteEnemyAbility extends EnemyAbility {
  static abilityTitle = "Ferocious bite";
  static effectValue = 2;
  static description = `Fügt Schaden in Höhe der Angriffskraft zu und zusätzlich für ${FerociousBiteEnemyAbility.effectValue} bluten.`;
  static imgSRC = "assets/img/enemyAbilities/ferocious-bite.jpeg";
  static cooldown = 5;
  static sfx = "BREAK_BONES";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = FerociousBiteEnemyAbility.imgSRC;
    this.delay = 600;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.takeDamage(
        this.user.attack.current + FerociousBiteEnemyAbility.effectValue
      );
      this.user.currentTarget.addBuffDebuff(BleedingDebuff);
      super.use();
    }
  }
}
