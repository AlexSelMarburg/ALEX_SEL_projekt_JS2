import { DecomposingPoisonDebuff } from "../buffDebuff/DecomposingPoisonDebuff.js";
import { EnemyAbility } from "./EnemyAbility.js";

export class SpittingDecomposingPoisonAbility extends EnemyAbility {
  static abilityTitle = "Spitting decomposing poison";
  static effectValue = 1;
  static description = `Spuckt Säure auf die Rüstung, wodurch diese jede Runde um ${SpittingDecomposingPoisonAbility.effectValue} veringert wird.`;
  static imgSRC = "assets/img/enemyAbilities/spitting-decomposing-poison.jpeg";
  static cooldown = 6;
  static sfx = "BREAK_BONES";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = SpittingDecomposingPoisonAbility.imgSRC;
    this.delay = 600;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.addBuffDebuff(DecomposingPoisonDebuff);
      super.use();
    }
  }
}
