import { initOptions } from "../modules/main.js";
import { GameEngine } from "../modules/GameEngine.js";
import { StartGamePanel } from "../modules/StartGamePanel.js";
import { addButton } from "../modules/install.js";
import { serviceWorkerAktiv } from "../modules/main.js";

export const gameSetting = {
  gameEngine: new GameEngine(),
  isPerformanceMode: false,
  hero: null,
  heroData: null,
  level: null,
};

export function resetGameSettings() {
  gameSetting.gameEngine = null;
  gameSetting.hero = null;
  gameSetting.heroData = null;
  gameSetting.level = null;
}

addButton();
serviceWorkerAktiv();

initOptions();

document
  .querySelector("#game-container #game-right-container")
  .appendChild(new StartGamePanel());
