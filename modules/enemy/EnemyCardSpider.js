import { FilledPoisonSackBuff } from "../buffDebuff/FilledPoisonSackBuff.js";
import { BasicAttackEnemyAbility } from "../EnemyAbilities/BasicAttackEnemyAbility.js";

import { EnemyCard } from "./EnemyCard.js";

export class EnemyCardSpider extends EnemyCard {
  static data = {
    imgURL: "assets/img/enemies/spider/",
    imgsArr: [
      "spider-1.png",
      "spider-2.png",
      "spider-3.png",
      "spider-4.png",
      "spider-5.png",
      "spider-6.png",
    ],
    rarity: "common",
    imgScale: 5.4,
    abilities: [BasicAttackEnemyAbility],
    className: "Spider",
  };

  static sfxOnDeath = "SPIDER_DEATH";

  constructor() {
    super(EnemyCardSpider.data);

    this.hp = { current: 13, max: 13 };
    this.armor = { current: 3, max: 3 };
    this.attack = { current: 7, max: 7 };
    this.magicAttack = { current: 0, max: 0 };

    this.addBuffDebuff(FilledPoisonSackBuff);
  }
}

customElements.define("enemy-card-spider", EnemyCardSpider);
