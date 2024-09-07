import { AimedShotAbility } from "../EnemyAbilities/AimedShot.js";
import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";

import { EnemyCard } from "./EnemyCard.js";

export class EnemyGoblinRanger extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/goblinRanger/",
    imgsArr: [
      "goblin-ranger-1.png",
      "goblin-ranger-2.png",
      "goblin-ranger-3.png",
      "goblin-ranger-4.png",
      "goblin-ranger-5.png",
    ],
    rarity: "common",
    imgScale: 5.4,
    abilities: [BasicAttackEnemyAbility, AimedShotAbility],
    className: "Goblin Ranger",
  };

  static sfxOnDeath = "GOBLIN_DEATH";

  constructor() {
    super(EnemyGoblinRanger.data);

    this.hp = { current: 12, max: 12 };
    this.armor = { current: 3, max: 3 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-goblin-ranger", EnemyGoblinRanger);
