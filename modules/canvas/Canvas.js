import { gameSetting } from "../../js/app.js";

export const CONFIG = Object.freeze({
  IMG_SIZE: 31,
  BUFF_IMG_SIZE_HERO: 42,
  BUFF_IMG_SIZE_ENEMY: 34,
  ENEMY_ABILITY_SIZE: 42,
  BUFF_MARGIN: 5,
  SCALE_MODIFIER: 0.22,
  FONT: "Press Start 2P",
  FONT_SIZE: 19,
  PERIOD: 2400,
  ENTITY_PULSE_PERIOD: 4500,
  DYNAMIC_FONT_SIZE: 34,
  GLOW_COLOR: {
    hero: "rgba(247, 198, 0, 0.95)",
    common: "rgba(255, 255, 255, 0.95)",
    uncommon: "rgba(142, 255, 151, 0.95)",
    rare: "rgba(229, 105, 251, 0.95)",
    epic: "rgba(245, 255, 54, 0.95)",
    legendary: "rgba(253, 138, 23, 0.95)",
  },
  GLOW_STRENGTH: 9,
  DAMAGE: {
    DURATION: 800,
    MOVE_DISTANCE: 220,
    START_Y: 70,
    TEXT_GAP: 30,
  },
  MAGIC_DAMAGE: {
    DURATION: 600,
    MOVE_DISTANCE: 220,
    START_Y: 80,
  },
  HEALING: {
    DURATION: 600,
    MOVE_DISTANCE: 150,
    START_Y: 15,
  },
  COLORS: {
    NEUTRAL: "#fff",
    DANGER: "#F77900",
    GOOD: "#A8F002",
    DAMAGE: "#FF0000",
    MAGIC_DAMAGE: "#009DED",
  },
  IMAGE_SOURCES: {
    heart: "assets/img/HUD/heart.png",
    heartBroken: "assets/img/HUD/heart-broken.png",
    shield: "assets/img/HUD/shield.png",
    swords: "assets/img/HUD/swords-crossed.png",
    canMove: "assets/img/HUD/can-move.png",
    loot: "assets/img/HUD/loot-icon.png",
  },
});

export class CardCanvas extends HTMLElement {
  constructor({ width, height }) {
    super();
    this.attachShadow({ mode: "open" });
    this.canvas = this.createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
    this.bgImage = new Image();
    this.colors = CONFIG.COLORS;
    this.animated = true;
    this.startTime = null;
  }

  set bgImageUrl(url) {
    this.bgImage.src = url;
  }

  get bgImageUrl() {
    return this.bgImage.src;
  }

  createCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    this.shadowRoot.appendChild(canvas);
    return canvas;
  }

  animate(timestamp) {
    if (!this.animated) return;
    if (!this.startTime) this.startTime = timestamp;
    const elapsed = timestamp - this.startTime;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw(elapsed);
  }

  draw(elapsed) {
    this.drawBackground();
    this.drawHUD?.(elapsed);
    this.drawEnemyAbilities?.();
    this.drawLootCardImage?.(elapsed);

    if (this.entityType === "hero") return;
    if (!this.user.activeEnemy && !gameSetting.isPerformanceMode) {
      this.animated = false;
    }
  }

  drawBackground() {
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawStaticImage(img, x, y, stat, textX, textY) {
    this.ctx.drawImage(img, x, y, CONFIG.IMG_SIZE, CONFIG.IMG_SIZE);
    if (stat) this.drawText(stat.current, textX, textY, stat);
  }

  setCurrentTextColor({ current, max }) {
    if (current < max) return this.colors.DANGER;
    if (current > max) return this.colors.GOOD;
    return this.colors.NEUTRAL;
  }

  drawText(text, x, y, stat) {
    this.ctx.fillStyle = this.setCurrentTextColor(stat);
    this.ctx.textAlign = "center";
    this.ctx.font = `${CONFIG.FONT_SIZE}px "${CONFIG.FONT}", sans-serif`;
    this.ctx.shadowColor = "black";
    this.ctx.shadowBlur = 1;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;
    this.ctx.fillText(text, x, y);
  }

  calculateScale(elapsed, period, base, amplitude) {
    return (
      base +
      amplitude *
        Math.abs(Math.sin(((elapsed % period) / period) * Math.PI * 2))
    );
  }

  drawPulsingImage(img, x, y, scale, stat, textY) {
    this.ctx.save();
    if (this.animated && img === this.entityImg && this.isGlowing) {
      this.ctx.shadowColor = CONFIG.GLOW_COLOR[this.rarity];
      this.ctx.shadowBlur = CONFIG.GLOW_STRENGTH;
    }
    this.ctx.translate(x, y);
    this.ctx.scale(scale, scale);
    this.ctx.drawImage(
      img,
      -CONFIG.IMG_SIZE / 2,
      -CONFIG.IMG_SIZE / 2,
      CONFIG.IMG_SIZE,
      CONFIG.IMG_SIZE
    );
    this.ctx.restore();
    if (stat) this.drawText(stat.current, x, textY, stat);
  }
}

customElements.define("card-canvas", CardCanvas);
