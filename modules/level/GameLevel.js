import { LootCard } from "../loot/LootCard.js";

export class GameLevel {
  constructor() {
    this.bgUrl = "assets/img/backgrounds/levels/";
    this.cards = [];
  }

  getRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * this.backgrounds.length);
    return `${this.bgUrl}${this.backgrounds[randomIndex]}`;
  }

  createEnemyCards() {
    this.enemyTypes.forEach(([EnemyClass, frequency]) => {
      for (let i = 0; i < frequency * 3; i++) {
        const enemyCard = new EnemyClass();
        enemyCard.loot = this.addLootToEnemyCard(EnemyClass.data.rarity);
        enemyCard.backgroundImageUrl = this.getRandomBackgroundImage();
        this.cards.push(enemyCard);
      }
    });
  }

  addLootToEnemyCard(rarity) {
    const lootChance = {
      common: 10,
      uncommon: 20,
      rare: 35,
      epic: 100,
    };

    const chance = lootChance[rarity] || 0;
    const random = Math.random() * 100;

    if (random <= chance) {
      const randomLoot =
        this.lootTypes[Math.floor(Math.random() * this.lootTypes.length)];
      return randomLoot;
    }

    return null;
  }

  createLootCards() {
    for (let i = 0; i < this.lootCardsCount * 3; i++) {
      const randomLoot =
        this.lootTypes[Math.floor(Math.random() * this.lootTypes.length)];
      const lootCard = new LootCard(randomLoot);
      lootCard.backgroundImageUrl = this.getRandomBackgroundImage();
      this.cards.push(lootCard);
    }
  }

  createBossCard() {
    const boss = new this.boss();
    boss.backgroundImageUrl = this.getRandomBackgroundImage();
    const randomLoot = this.bossLoot;
    boss.loot = randomLoot;
    return boss;
  }

  fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getNextEnemyRow() {
    if (this.waves <= 0) return null;
    this.waves--;
    return this.cards.splice(0, 3);
  }

  init() {
    this.createEnemyCards();
    this.createLootCards();
    this.fisherYatesShuffle(this.cards);
    this.waves = this.cards.length / 3;
  }
}
