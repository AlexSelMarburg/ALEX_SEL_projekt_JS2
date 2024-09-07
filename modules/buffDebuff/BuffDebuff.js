import { sfxPlayer } from "../AudioPlayer.js";

export class BuffDebuff {
  constructor(target, duration) {
    this.target = target;
    this.duration = duration;
    this.currentDuration = duration;
  }

  init() {
    if (this.onAdd) this.onAdd();
  }

  tick() {
    if (this.onTick) this.onTick();
    this.currentDuration--;

    if (this.sfx) {
      sfxPlayer.play(this.sfx);
    }

    if (this.currentDuration <= 0) {
      this.remove();
    }
  }

  remove() {
    if (this.onRemove) this.onRemove();
  }
}
