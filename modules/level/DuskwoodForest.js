import { GameLevel } from "./GameLevel.js";

import { BagExtension } from "../consumable/BagExtension.js";
import { MinorPotion } from "../consumable/MinorPotionConsumable.js";
import { MediumPotion } from "../consumable/MediumPotionConsumable.js";
import { Whetstone } from "../consumable/WhetstoneConsumable.js";

import { EnemyCardBat } from "../enemy/EnemyCardBat.js";
import { EnemyCardWaran } from "../enemy/EnemyCardWaran.js";
import { EnemyGoblinRanger } from "../enemy/EnemyGoblinRanger.js";
import { EnemyCardWolf } from "../enemy/EnemyCardWolf.js";
import { EnemyCardSpider } from "../enemy/EnemyCardSpider.js";
import { EnemyCardAnaconda } from "../enemy/EnemyCardAnaconda.js";
import { EnemyCardBear } from "../enemy/EnemyCardBear.js";
import { BigPotion } from "../consumable/BigPotionConsumable.js";

export class DuskwoodForest extends GameLevel {
  static title = "Duskwood Forest";
  static selectPanelBackground =
    "assets/img/backgrounds/levels/forest/forest-1.jpeg";
  static description = `Wald voller gefährlicher Wölfe und anderer wilder Tiere, die ihr Revier verteidigen. Zwischen den Bäumen verbergen sich zudem einige Goblins aus der Umgebung, die auf Beute lauern und den Wald noch gefährlicher machen.`;
  static lootTypes = [BigPotion, MediumPotion, Whetstone];
  static bossLoot = BagExtension;
  static bgMusic = "FOREST";

  constructor() {
    super();
    this.waves = 0;
    this.boss = EnemyCardBear;
    this.bossLoot = DuskwoodForest.bossLoot;
    this.lootTypes = DuskwoodForest.lootTypes;
    this.enemyTypes = [
      [EnemyGoblinRanger, 4],
      [EnemyCardBat, 2],
      [EnemyCardWaran, 1],
      [EnemyCardWolf, 4],
      [EnemyCardSpider, 2],
      [EnemyCardAnaconda, 1],
    ];

    this.lootCardsCount = 3;

    this.backgrounds = [
      "forest/forest-1.jpeg",
      "forest/forest-2.jpeg",
      "forest/forest-3.jpeg",
      "forest/forest-4.jpeg",
      "forest/forest-5.jpeg",
      "forest/forest-6.jpeg",
      "forest/forest-7.jpeg",
      "forest/forest-8.jpeg",
      "forest/forest-9.jpeg",
    ];
  }
}
