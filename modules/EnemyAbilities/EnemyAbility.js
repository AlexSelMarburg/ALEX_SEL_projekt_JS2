import { sfxPlayer } from "../AudioPlayer.js";

export class EnemyAbility {
  construct() {}

  get isOnCooldown() {
    return this.currentCooldown > 0;
  }

  use() {
    sfxPlayer.play(this.constructor.sfx);
    this.currentCooldown = this.constructor.cooldown;
  }

  updateCurrentCooldown() {
    if (this.currentCooldown > 0) this.currentCooldown--;
  }
}
