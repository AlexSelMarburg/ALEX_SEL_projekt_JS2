import { EntityCardCanvas } from "./EntityCardCanvas.js";
import { CONFIG } from "./Canvas.js";

const style = document.createElement("style");
style.textContent = `@import "../css/hero-card-canvas.css";`;

export class HeroCardCanvas extends EntityCardCanvas {
  static #canvasDimensions = {
    width: 280,
    height: 264,
  };

  constructor(char, user) {
    super({ char, ...HeroCardCanvas.#canvasDimensions });
    this.canMoveImg = this.createCanMoveImage();
    this.entityType = "hero";
    this.rarity = "hero";
    this.user = user;
    this.shadowRoot.append(this.canvas, style);
  }

  setCurrentTextColor({ current, max }) {
    if (current < max) return this.colors.DANGER;
    if (current > max) return this.colors.GOOD;
    return this.colors.NEUTRAL;
  }

  createCanMoveImage() {
    const img = new Image();
    img.src = CONFIG.IMAGE_SOURCES.canMove;
    return img;
  }

  set canMove(value) {
    this._canMove = value;
  }

  get canMove() {
    return this._canMove;
  }

  drawHUD(elapsed) {
    super.drawHUD(elapsed);
    if (this._canMove) {
      this.drawCanMoveIndicator(elapsed);
    }
  }

  drawCanMoveIndicator(elapsed) {
    const baseScale = 0.9;
    const amplitude = 0.1;
    const period = CONFIG.PERIOD;
    const canMoveScale = this.calculateScale(
      elapsed,
      period,
      baseScale,
      amplitude
    );

    this.drawPulsingImage(
      this.canMoveImg,
      this.canvas.width - CONFIG.IMG_SIZE / 2 - 10,
      this.canvas.height - CONFIG.IMG_SIZE / 2 - 8,
      canMoveScale
    );
  }

  calculateScale(elapsed, period, base, amplitude) {
    return (
      base +
      amplitude *
        Math.abs(Math.sin(((elapsed % period) / period) * Math.PI * 2))
    );
  }
}

customElements.define("hero-card-canvas", HeroCardCanvas);
