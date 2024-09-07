import { EnemyCard } from "./EnemyCard.js";
import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";
import { FerociousBiteEnemyAbility } from "../EnemyAbilities/FerociousBiteEnemyAbility.js";
import { LizardTailBlowEnemyAbility } from "../EnemyAbilities/LizardTailBlowEnemyAbility.js";

export class EnemyCardAlligator extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/alligator/",
    imgsArr: [
      "alligator-1.png",
      "alligator-2.png",
      "alligator-3.png",
      "alligator-4.png",
      "alligator-5.png",
    ],
    rarity: "rare",
    imgScale: 6.1,
    abilities: [
      BasicAttackEnemyAbility,
      FerociousBiteEnemyAbility,
      LizardTailBlowEnemyAbility,
    ],
    className: "Alligator",
  };

  static sfxOnDeath = "BIG_ANIMAL_DEATH";

  constructor() {
    super(EnemyCardAlligator.data);

    this.hp = { current: 24, max: 24 };
    this.armor = { current: 5, max: 5 };
    this.attack = { current: 9, max: 9 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-alligator", EnemyCardAlligator);
