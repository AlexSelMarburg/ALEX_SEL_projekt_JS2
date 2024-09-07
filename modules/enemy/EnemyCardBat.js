import { EnemyCard } from "./EnemyCard.js";
import { VampiricBiteEnemyAbility } from "../EnemyAbilities/VampiricBiteEnemyAbility.js";
import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";

export class EnemyCardBat extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/bat/",
    imgsArr: ["bat-1.png", "bat-2.png", "bat-3.png", "bat-4.png", "bat-5.png"],
    rarity: "common",
    imgScale: 6,
    abilities: [BasicAttackEnemyAbility, VampiricBiteEnemyAbility],
    className: "Sewers Bat",
  };

  static sfxOnDeath = "RAT_BAT_DEATH";

  constructor() {
    super(EnemyCardBat.data);
    this.hp = { current: 8, max: 8 };
    this.armor = { current: 2, max: 2 };
    this.attack = { current: 8, max: 8 };
    this.magicAttack = { current: 0, max: 0 };
  }
}

customElements.define("enemy-card-bat", EnemyCardBat);
