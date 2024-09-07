import { EnemyAbility } from "./EnemyAbility.js";

export class VampiricBiteEnemyAbility extends EnemyAbility {
  static abilityTitle = "Vampiric Bite";
  static effectValue = 2;
  static description = `Fügt Schaden in Höhe der Angriffskraft zu und saugt 
                        ${VampiricBiteEnemyAbility.effectValue} Blut dem Gegner ab.`;
  static imgSRC = "assets/img/enemyAbilities/vampiric-bite.jpeg";
  static cooldown = 0;
  static sfx = "BASIC_HIT";

  constructor(user) {
    super();
    this.user = user;
    this.currentCooldown = 0;
    this.icon = new Image();
    this.icon.src = VampiricBiteEnemyAbility.imgSRC;
    this.delay = 400;
  }

  use() {
    if (!this.isOnCooldown) {
      this.user.currentTarget.takeDamage(this.user.attack.current);
      this.user.takeHealing(VampiricBiteEnemyAbility.effectValue);
      this.user.currentTarget.takeMagicDamage(
        VampiricBiteEnemyAbility.effectValue
      );
      super.use();
    }
  }
}
