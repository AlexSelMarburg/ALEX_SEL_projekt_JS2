import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";
import { BearRoarEnemyAbility } from "../EnemyAbilities/BearRoarEnemyAbility.js";
import { FerociousBiteEnemyAbility } from "../EnemyAbilities/FerociousBiteEnemyAbility.js";
import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardBear extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/bear/",
    imgsArr: ["bear-1.png", "bear-2.png", "bear-3.png", "bear-4.png"],
    rarity: "rare",
    imgScale: 6,
    abilities: [
      BasicAttackEnemyAbility,
      FerociousBiteEnemyAbility,
      BearRoarEnemyAbility,
    ],
    className: "Bear",
  };

  static sfxOnDeath = "BIG_ANIMAL_DEATH";

  constructor() {
    super(EnemyCardBear.data);

    this.hp = { current: 30, max: 30 };
    this.armor = { current: 4, max: 4 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-bear", EnemyCardBear);
