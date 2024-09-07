import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";
import { LizardTailBlowEnemyAbility } from "../EnemyAbilities/LizardTailBlowEnemyAbility.js";

import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardWaran extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/varan/",
    imgsArr: ["waran-1.png", "waran-2.png", "waran-3.png"],
    rarity: "uncommon",
    imgScale: 5.4,
    abilities: [BasicAttackEnemyAbility, LizardTailBlowEnemyAbility],
    className: "Waran",
  };

  static sfxOnDeath = "BIG_ANIMAL_DEATH";

  constructor() {
    super(EnemyCardWaran.data);

    this.hp = { current: 16, max: 16 };
    this.armor = { current: 4, max: 4 };
    this.attack = { current: 10, max: 10 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-waran", EnemyCardWaran);
