import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";
import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardRat extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/rat/",
    imgsArr: [
      "rat-1.png",
      "rat-2.png",
      "rat-3.png",
      "rat-4.png",
      "rat-5.png",
      "rat-6.png",
    ],
    rarity: "common",
    imgScale: 3.4,
    abilities: [BasicAttackEnemyAbility],
    className: "Sewers Rat",
  };

  static sfxOnDeath = "RAT_BAT_DEATH";

  constructor() {
    super(EnemyCardRat.data);
    this.hp = { current: 11, max: 11 };
    this.armor = { current: 3, max: 3 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-rat", EnemyCardRat);
