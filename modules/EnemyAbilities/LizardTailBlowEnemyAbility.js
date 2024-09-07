import { EnemyAbility } from "./EnemyAbility.js";

export class LizardTailBlowEnemyAbility extends EnemyAbility {
  static abilityTitle = "Lizard tail blow";
  static effectValue = 2;
  static description = `Fügt Schaden in Höhe der Angriffskraft und zusätzlich ${LizardTailBlowEnemyAbility.effectValue}.`;
  static imgSRC = "assets/img/enemyAbilities/lizard-tail-blow.jpeg";
  static cooldown = 4;
  static sfx = "TAILSWING";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = LizardTailBlowEnemyAbility.imgSRC;
    this.delay = 1000;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.takeDamage(
        this.user.attack.current + LizardTailBlowEnemyAbility.effectValue
      );
      super.use();
    }
  }
}
