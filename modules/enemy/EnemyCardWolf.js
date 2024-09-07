import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";

import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardWolf extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/wolf/",
    imgsArr: [
      "wolf-1.png",
      "wolf-2.png",
      "wolf-3.png",
      "wolf-4.png",
      "wolf-5.png",
      "wolf-6.png",
    ],
    rarity: "common",
    imgScale: 5.4,
    abilities: [BasicAttackEnemyAbility],
    className: "Wolf",
  };

  static sfxOnDeath = "BIG_ANIMAL_DEATH";

  constructor() {
    super(EnemyCardWolf.data);

    this.hp = { current: 16, max: 16 };
    this.armor = { current: 4, max: 4 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-wolf", EnemyCardWolf);
