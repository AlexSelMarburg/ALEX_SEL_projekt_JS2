import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";
import { SpittingDecomposingPoisonAbility } from "../EnemyAbilities/SpittingDecomposingPoisonAbility.js";

import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardAnaconda extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/snake/",
    imgsArr: [
      "snake-1.png",
      "snake-2.png",
      "snake-3.png",
      "snake-4.png",
      "snake-5.png",
    ],
    rarity: "uncommon",
    imgScale: 5.8,
    abilities: [BasicAttackEnemyAbility, SpittingDecomposingPoisonAbility],
    className: "Anaconda",
  };

  static sfxOnDeath = "BIG_ANIMAL_DEATH";

  constructor() {
    super(EnemyCardAnaconda.data);

    this.hp = { current: 18, max: 18 };
    this.armor = { current: 4, max: 4 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-anaconda", EnemyCardAnaconda);
