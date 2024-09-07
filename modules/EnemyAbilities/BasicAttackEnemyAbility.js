import { EnemyAbility } from "./EnemyAbility.js";

export class BasicAttackEnemyAbility extends EnemyAbility {
  static abilityTitle = "Basic Attack";
  static description = "Fügt Schaden in Höhe der Angriffskraft zu.";
  static imgSRC = "assets/img/enemyAbilities/basic-attack.jpeg";
  static cooldown = 0;
  static sfx = "BASIC_HIT";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = BasicAttackEnemyAbility.imgSRC;
    this.delay = 600;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.takeDamage(this.user.attack.current);
      if (this.user.magicAttack.current > 0) {
        this.user.currentTarget.takeMagicDamage(this.user.magicAttack.current);
      }

      super.use();
    }
  }
}
