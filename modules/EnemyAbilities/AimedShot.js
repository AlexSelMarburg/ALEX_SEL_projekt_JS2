import { getRandomInt } from "../lib/utils.js";
import { EnemyAbility } from "./EnemyAbility.js";

export class AimedShotAbility extends EnemyAbility {
  static abilityTitle = "Basic Attack";
  static minEffectValue = 1;
  static maxEffectValue = 3;
  static description = `Fügt Schaden in Höhe der Angriffskraft und zusätzlich ${AimedShotAbility.minEffectValue} bis ${AimedShotAbility.maxEffectValue} Punkte Schaden zu.`;
  static imgSRC = "assets/img/enemyAbilities/aimed-shot.jpeg";
  static cooldown = 0;
  static sfx = "AIMED_SHOT";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = AimedShotAbility.imgSRC;
    this.delay = 600;
  }

  use() {
    if (!this.isOnCooldown) {
      const damage = getRandomInt(
        AimedShotAbility.minEffectValue,
        AimedShotAbility.maxEffectValue
      );
      this.user.currentTarget.takeDamage(this.user.attack.current + damage);
      super.use();
    }
  }
}
