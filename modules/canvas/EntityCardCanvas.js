import { CardCanvas, CONFIG } from "./Canvas.js";

const createImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

const initEffect = () => ({ value: null, displayUntil: null, startTime: null });

export class EntityCardCanvas extends CardCanvas {
  constructor(data) {
    super({ width: data.width, height: data.height });
    const { rarity, img, imgScale } = data.char;
    this.img = img;
    this.imgScale = imgScale;
    this.rarity = rarity;
    this._isGlowing = false;
    this.loadImages();

    this.colors = CONFIG.COLORS;
    this.effects = {
      damage: initEffect(),
      magicDamage: initEffect(),
      healing: initEffect(),
    };
  }

  set entityImgSrc(src) {
    if (src) {
      this.entityImg.setAttribute("src", src);
    }
  }

  loadImages() {
    const { heart, shield, swords, loot } = CONFIG.IMAGE_SOURCES;
    this.heartImg = createImage(heart);
    this.shieldImg = createImage(shield);
    this.swordsImg = createImage(swords);
    this.lootImg = createImage(loot);
    this.entityImg = createImage(this.img);
  }

  set isGlowing(value) {
    this._isGlowing = value;
  }

  get isGlowing() {
    return this._isGlowing;
  }

  drawHUD(elapsed) {
    const baseScale = 0.9;
    const scaleAmplitude = 0.15;
    const scalePeriod = CONFIG.PERIOD;
    const scaleFactor = this.calculateScale(
      elapsed,
      scalePeriod,
      baseScale,
      scaleAmplitude
    );

    const entityPulsePeriod = CONFIG.ENTITY_PULSE_PERIOD;
    const entityScale = this.calculateScale(
      elapsed,
      entityPulsePeriod,
      this.imgScale,
      CONFIG.SCALE_MODIFIER
    );

    this.drawPulsingImage(
      this.entityImg,
      this.canvas.width / 2,
      this.canvas.height / 2 + 10,
      entityScale
    );
    this.updateHeartImage();
    this.drawPulsingImage(
      this.heartImg,
      8 + CONFIG.IMG_SIZE / 2,
      8 + CONFIG.IMG_SIZE / 2,
      scaleFactor,
      this.user.hp,
      9 + CONFIG.IMG_SIZE * 1.5 + 5
    );
    this.drawStaticImage(
      this.swordsImg,
      this.canvas.width - CONFIG.IMG_SIZE - 8,
      8,
      this.user.attack,
      this.canvas.width - CONFIG.IMG_SIZE / 2 - 7,
      9 + CONFIG.IMG_SIZE * 1.5 + 5
    );
    this.drawStaticImage(
      this.shieldImg,
      this.canvas.width - CONFIG.IMG_SIZE - 8,
      18 + CONFIG.IMG_SIZE + 18,
      this.user.armor,
      this.canvas.width - CONFIG.IMG_SIZE / 2 - 7,
      24 + CONFIG.IMG_SIZE * 2.5 + 18
    );

    if (this.user.loot) {
      this.drawLootImage(scaleFactor + 0.3);
    }

    this.drawBuffsDebuffs();
  }

  updateHeartImage() {
    this.heartImg.src =
      this.user.hp.current <= Math.floor(this.user.hp.max * 0.3)
        ? CONFIG.IMAGE_SOURCES.heartBroken
        : CONFIG.IMAGE_SOURCES.heart;
  }

  drawLootImage(scale) {
    this.ctx.shadowColor = CONFIG.GLOW_COLOR[this.user.loot.rarity];
    this.ctx.shadowBlur = 8;
    this.drawPulsingImage(
      this.lootImg,
      this.canvas.width / 2,
      CONFIG.ENEMY_ABILITY_SIZE / 2 + CONFIG.BUFF_MARGIN,
      scale
    );
    this.ctx.shadowColor = "transparent";
  }

  drawBuffsDebuffs() {
    const imgSize =
      this.rarity === "hero"
        ? CONFIG.BUFF_IMG_SIZE_HERO
        : CONFIG.BUFF_IMG_SIZE_ENEMY;
    this.user.buffsDebuffs.slice(0, 4).forEach((buffDebuff, index) => {
      if (buffDebuff.icon) {
        this.ctx.drawImage(
          buffDebuff.icon,
          CONFIG.BUFF_MARGIN,
          this.canvas.height -
            imgSize * (index + 1) -
            CONFIG.BUFF_MARGIN * (index + 1),
          imgSize,
          imgSize
        );
      }
    });
  }

  takeDamage(damage) {
    this.createEffect("damage", damage, CONFIG.DAMAGE.DURATION);
  }

  takeMagicDamage(damage) {
    this.createEffect("magicDamage", damage, CONFIG.MAGIC_DAMAGE.DURATION);
  }

  takeHealing(healing) {
    this.createEffect("healing", healing, CONFIG.HEALING.DURATION);
  }

  createEffect(type, value, duration) {
    const currentTime = performance.now();
    this.effects[type] = {
      value,
      startTime: currentTime,
      displayUntil: currentTime + duration,
    };
  }

  draw(elapsed) {
    super.draw(elapsed);
    this.drawEffects(elapsed);
  }

  drawEffects(elapsed) {
    const currentTime = performance.now();
    this.drawEffect(
      this.effects.damage,
      currentTime,
      CONFIG.DAMAGE,
      this.colors.DAMAGE,
      `-${this.effects.damage.value}`
    );
    this.drawEffect(
      this.effects.magicDamage,
      currentTime,
      CONFIG.MAGIC_DAMAGE,
      this.colors.MAGIC_DAMAGE,
      `-${this.effects.magicDamage.value}`
    );
    this.drawEffect(
      this.effects.healing,
      currentTime,
      CONFIG.HEALING,
      this.colors.GOOD,
      `+${this.effects.healing.value}`
    );
  }

  drawEffect(effect, currentTime, config, color, text) {
    if (effect.value !== null && currentTime < effect.displayUntil) {
      const timePassed = currentTime - effect.startTime;
      const fraction = timePassed / config.DURATION;
      const currentY = config.START_Y + config.MOVE_DISTANCE * fraction;
      this.ctx.fillStyle = color;
      this.ctx.font = `${CONFIG.DYNAMIC_FONT_SIZE}px "${CONFIG.FONT}", sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.fillText(text, this.canvas.width / 2, currentY);
    } else {
      effect.value = null;
    }
  }
}

customElements.define("entity-card-canvas", EntityCardCanvas);
