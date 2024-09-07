import { GameLevel } from "./GameLevel.js";

import { BagExtension } from "../consumable/BagExtension.js";
import { MinorPotion } from "../consumable/MinorPotionConsumable.js";
import { Whetstone } from "../consumable/WhetstoneConsumable.js";
import { EnemyCardAlligator } from "../enemy/EnemyCardAlligator.js";
import { EnemyCardRat } from "../enemy/EnemyCardRat.js";
import { EnemyCardBat } from "../enemy/EnemyCardBat.js";
import { EnemyCardWaran } from "../enemy/EnemyCardWaran.js";
import { MediumPotion } from "../consumable/MediumPotionConsumable.js";

export class LocalSewers extends GameLevel {
  static title = "Local Sewers";
  static selectPanelBackground =
    "assets/img/backgrounds/levels/sewers/sewers-1.jpeg";
  static description = `Feuchte, muffige Kanalisation, durchzogen von engen, dunklen
      Gängen. Überall huschen Ratten und flatternde Fledermäuse
      durch die Luft. Die Wände sind mit Schimmel bedeckt, und das
      Wasser auf dem Boden ist trübe und übelriechend.`;
  static lootTypes = [MinorPotion, Whetstone, MediumPotion];
  static bossLoot = BagExtension;
  static bgMusic = "SEWERS";

  constructor() {
    super();
    this.waves = 0;
    this.boss = EnemyCardAlligator;
    this.bossLoot = LocalSewers.bossLoot;
    this.lootTypes = LocalSewers.lootTypes;
    this.enemyTypes = [
      [EnemyCardRat, 7],
      [EnemyCardBat, 5],
      [EnemyCardWaran, 2],
    ];

    this.lootCardsCount = 2;

    this.backgrounds = [
      "sewers/sewers-1.jpeg",
      "sewers/sewers-2.jpeg",
      "sewers/sewers-3.jpeg",
      "sewers/sewers-4.jpeg",
      "sewers/sewers-5.jpeg",
      "sewers/sewers-6.jpeg",
      "sewers/sewers-7.jpeg",
      "sewers/sewers-8.jpeg",
      "sewers/sewers-9.jpeg",
      "sewers/sewers-10.jpeg",
      "sewers/sewers-11.jpeg",
      "sewers/sewers-12.jpeg",
      "sewers/sewers-13.jpeg",
    ];
  }
}
