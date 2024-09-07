import { CONFIG, CardCanvas } from "./Canvas.js";

export class LootCardCanvas extends CardCanvas {
  static #canvasDimensions = {
    width: 280,
    height: 220,
  };

  constructor(user) {
    super({
      width: LootCardCanvas.#canvasDimensions.width,
      height: LootCardCanvas.#canvasDimensions.height,
    });
    this.user = user;
    this.img = new Image();
    this.img.src = this.user.loot.imgSRC;
  }

  drawLootCardImage(elapsed) {
    this.ctx.textAlign = "center";
    this.ctx.font = `16px "${CONFIG.FONT}", sans-serif`;
    this.ctx.fillStyle = "white";
    this.ctx.shadowColor = "black";
    this.ctx.shadowBlur = 1;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.fillText(this.user.loot.name, this.canvas.width / 2, 30);

    const baseScale = 0.9;
    const scaleAmplitude = 0.2;
    const scalePeriod = CONFIG.PERIOD;
    const scaleFactor = this.calculateScale(
      elapsed,
      scalePeriod,
      baseScale,
      scaleAmplitude
    );

    this.ctx.shadowColor = CONFIG.GLOW_COLOR[this.user.loot.rarity];
    this.ctx.shadowBlur = 15;
    this.drawPulsingImage(
      this.img,
      this.canvas.width / 2,
      this.canvas.height / 2,
      scaleFactor + this.user.loot.scale
    );
    this.ctx.shadowColor = "transparent";
  }
}

customElements.define("loot-card-canvas", LootCardCanvas);
