import { gameSetting, resetGameSettings } from "../js/app.js";
import { musicPlayer, sfxPlayer } from "./AudioPlayer.js";
import { GameBoard } from "./GameBoard.js";
import { DungeonInfoPanel } from "./DungeonInfoPanel.js";
import { delay } from "./lib/utils.js";
import { db } from "./db.js";
import { StartGamePanel } from "./StartGamePanel.js";

const timers = Object.freeze({
  PLACE_ENEMY_WAVE: 450,
  TURN_DELAY: 800,
  VICTORY_DELAY: 3500,
});

export class GameEngine {
  constructor() {
    this.heroCard = null;
    this.level = null;
    this.wavesCount = 0;
    this.boss = null;
    this.activeEnemy = null;
    this.enemyCards = Array.from({ length: 3 }, () => Array(3).fill(null));
    this.isHeroTurn = false;
    this.isEnemyTurn = false;
  }

  init(heroCard, level) {
    if (!heroCard || !level) return;
    this.heroCard = heroCard;
    this.level = level;
    this.heroCard.endHeroTurn = this.endHeroTurn.bind(this);
    this.heroCard.takeLoot = this.takeLoot.bind(this);
    this.level.init();
    this.initGameBoard();
    this.wavesCount = this.level.waves;
    this.infoPanel = new DungeonInfoPanel(this.leaveDungeon);

    document.querySelector("#game-left-container").appendChild(this.infoPanel);
    this.infoPanel.setWavesCount(this.wavesCount);
    if (this.level.constructor?.bgMusic) {
      musicPlayer.play(this.level.constructor.bgMusic);
    }
  }

  async handleHeroDeath() {
    const data = this.heroCard.createHeroSaveData();
    db.updateItem(data);
    await delay(timers.VICTORY_DELAY);
    this.gameBoard.remove();
    this.infoPanel.remove();
    resetGameSettings();
    document
      .querySelector("#game-container #game-right-container")
      .appendChild(new StartGamePanel());
  }

  leaveDungeon = () => {
    sfxPlayer.play("CLICK_BTN");
    musicPlayer.stopAllSounds();
    this.gameBoard.remove();
    this.infoPanel.remove();
    resetGameSettings();
    document
      .querySelector("#game-container #game-right-container")
      .appendChild(new StartGamePanel());
  };

  resetGame() {
    this.heroCard = null;
    this.level = null;
    this.wavesCount = 0;
    this.boss = null;
    this.activeEnemy = null;
    this.enemyCards = Array.from({ length: 3 }, () => Array(3).fill(null));
    this.isHeroTurn = false;
    this.isEnemyTurn = false;
  }

  updateWavesCount() {
    if (this.boss) return;
    this.wavesCount--;
    this.infoPanel.setWavesCount(this.wavesCount || 0);
    if (this.wavesCount <= 0) return true;
  }

  async initBossBattle() {
    this.gameBoard.placeHeroCard();
    this.toggleHeroActions(false);
    this.boss = this.level.createBossCard();
    this.activeEnemy = this.boss;
    this.activeEnemy.activeEnemy = true;
    this.setCurrentOpponents();

    await delay(timers.TURN_DELAY);
    this.gameBoard.placeBossCard(this.boss);
    await delay(timers.TURN_DELAY);
    this.endEnemyTurn();
  }

  setActiveEnemy() {
    const heroPos = +this.heroCard.position;
    this.activeEnemy = this.enemyCards[2][heroPos];
    if (this.activeEnemy) {
      this.activeEnemy.activeEnemy = true;
      this.activeEnemy.canvas.animated = true;
    }
  }

  startGame() {
    const temp = gameSetting.isPerformanceMode;
    gameSetting.isPerformanceMode = true;

    this.gameBoard.placeHeroCard();
    this.initFirstTwoWaves();
    this.setHeroCardBackground();
    this.animateCards();

    setTimeout(() => {
      gameSetting.isPerformanceMode = temp;
      this.updateIsPerformanceMode(temp);
    }, 500);
  }

  takeLoot() {
    this.handleDeadEnemy();
  }

  async initFirstTwoWaves() {
    this.enemyCards[0] = this.level.getNextEnemyRow();
    this.enemyCards[1] = this.level.getNextEnemyRow();

    await this.placeEnemyWave(0);
    await this.placeEnemyWave(1);

    await delay(timers.TURN_DELAY);
    this.isHeroTurn = true;

    await this.endEnemyTurn();
  }

  async placeEnemyWave(row) {
    await delay(timers.PLACE_ENEMY_WAVE);
    this.gameBoard.placeEnemyRow(row, this.enemyCards[row]);
  }

  setFrontRowNull() {
    this.enemyCards[2].fill(null);
  }

  endHeroTurn = async () => {
    this.toggleHeroActions(false);
    this.isHeroTurn = false;

    if (this.activeEnemy && this.activeEnemy.isDead) {
      if (this.activeEnemy.loot) {
        this.transferLootToHeroBackpack();
      }

      await this.handleDeadEnemy();
    } else {
      await this.enemyAction();
    }
  };

  async handleBossDefeat() {
    const data = this.heroCard.createHeroSaveData();
    db.updateItem(data);
    sfxPlayer.play("VICTORY");
    await delay(timers.VICTORY_DELAY);
    this.gameBoard.remove();
    this.infoPanel.remove();
    resetGameSettings();
    document
      .querySelector("#game-container #game-right-container")
      .appendChild(new StartGamePanel());
  }

  async handleDeadEnemy() {
    await delay(timers.TURN_DELAY);

    this.heroCard.backgroundImageUrl = this.activeEnemy.canvas.bgImageUrl;
    this.gameBoard.removeFrontRow();

    if (this.boss) {
      this.handleBossDefeat();
      return;
    }

    this.setFrontRowNull();
    this.activeEnemy = null;
    this.heroCard.currentTarget = null;
    await delay(timers.TURN_DELAY);
    this.heroCard.updateAbilityCooldownDisplay();

    if (this.updateWavesCount() && !this.boss) {
      this.initBossBattle();
      return;
    }

    this.toggleHeroActions(true);
  }

  toggleHeroActions(canAct) {
    this.heroCard.setCanPerformAction(canAct);
    this.heroCard.setCanMove(canAct);
  }

  transferLootToHeroBackpack() {
    this.heroCard.backpack.addConsumableItem(this.activeEnemy.loot);
    this.activeEnemy.lootCard = null;
  }

  endEnemyTurn = async () => {
    this.heroCard.updateAbilityCooldownDisplay();

    if (this.activeEnemy && this.activeEnemy.type !== "lootCard") {
      this.activeEnemy.setCanPerformAction(false);
      this.activeEnemy.updateAbilityCooldownDisplay();
    }

    this.isEnemyTurn = false;

    await this.heroCard.updateBuffsDebuffs();
    await delay(timers.TURN_DELAY);

    this.isHeroTurn = true;
    this.toggleHeroActions(true);

    if (this.isFrontRowEmpty()) {
      this.heroCard.setCanMove(true);
    } else {
      this.heroCard.setCanMove(false);
    }
  };

  isFrontRowEmpty() {
    return this.enemyCards[2][0] === null && !this.activeEnemy;
  }

  async enemyAction() {
    if (this.isFrontRowEmpty()) {
      this.moveWaves();
    }

    if (this.activeEnemy && this.activeEnemy.type !== "lootCard") {
      await delay(timers.TURN_DELAY);
      await this.activeEnemy?.updateBuffsDebuffs?.();

      if (this.activeEnemy && this.activeEnemy.isDead) {
        if (this.activeEnemy.loot) {
          this.transferLootToHeroBackpack();
        }

        await this.handleDeadEnemy();
        return;
      }

      this.activeEnemy.setCanPerformAction(true);
      await this.activeEnemy.useReadyAbility();

      if (this.heroCard.defeated) {
        this.handleHeroDeath();
        return;
      }

      await this.endEnemyTurn();
    }
  }

  async moveWaves() {
    await delay(timers.PLACE_ENEMY_WAVE);

    this.enemyCards[2] = this.enemyCards[1];
    this.gameBoard.placeEnemyRow(2, this.enemyCards[1]);

    this.enemyCards[1] = this.enemyCards[0];
    this.gameBoard.placeEnemyRow(1, this.enemyCards[0]);

    const newRow = this.level.getNextEnemyRow();
    if (newRow) {
      this.enemyCards[0] = newRow;
      await this.placeEnemyWave(0);
    } else {
      this.enemyCards[0] = [null, null, null];
    }

    await this.endEnemyTurn();
    this.setActiveEnemy();
    this.setCurrentOpponents();
  }

  updateIsPerformanceMode(value) {
    for (const row of this.enemyCards) {
      for (const enemy of row) {
        if (enemy) {
          enemy.canvas.animated = enemy.activeEnemy ? true : value;
        }
      }
    }
  }

  setCurrentOpponents() {
    if (this.activeEnemy) {
      this.heroCard.currentTarget = this.activeEnemy;
      this.activeEnemy.currentTarget = this.heroCard;
    }
  }

  setHeroCardBackground() {
    this.heroCard.backgroundImageUrl = this.level.getRandomBackgroundImage();
  }

  initGameBoard() {
    this.gameBoard = new GameBoard(this.heroCard);
    document
      .querySelector("#game-container #game-right-container")
      .appendChild(this.gameBoard);
  }

  animateCards = (timestamp) => {
    this.heroCard.canvas.animate(timestamp);

    if (this.boss) {
      this.boss.canvas.animate(timestamp);
      requestAnimationFrame(this.animateCards);
      return;
    }

    for (const row of this.enemyCards) {
      for (const enemy of row) {
        if (enemy?.canvas && enemy.canvas.animated) {
          enemy.canvas.animate(timestamp);
        }
      }
    }
    requestAnimationFrame(this.animateCards);
  };
}
