import { ScaredDebuff } from "../buffDebuff/ScaredDebuff.js";
import { EnemyAbility } from "./EnemyAbility.js";

export class BearRoarEnemyAbility extends EnemyAbility {
  static abilityTitle = "Ferocious bite";
  static cooldown = 7;
  static description = `Ein grausames Brüllen, das die Angriffskraft des Gegners verringert.`;
  static imgSRC = "assets/img/enemyAbilities/bear-roar.jpeg";
  static sfx = "BEAR_ROAR";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = BearRoarEnemyAbility.imgSRC;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.addBuffDebuff(ScaredDebuff);
      super.use();
    }
  }
}
