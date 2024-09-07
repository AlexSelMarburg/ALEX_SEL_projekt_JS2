import { CONFIG } from "./Canvas.js";
import { EntityCardCanvas } from "./EntityCardCanvas.js";

const style = document.createElement("style");
style.textContent = `@import "../css/enemy-card-canvas.css";`;

export class EnemyCardCanvas extends EntityCardCanvas {
  static #canvasDimensions = {
    width: 280,
    height: 220,
  };

  constructor(char, user) {
    super({ char, ...EnemyCardCanvas.#canvasDimensions });
    this.user = user;
    this.entityType = "enemy";
    this.rarity = char.rarity;
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
  }

  drawEnemyAbilities() {
    this.user.abilities.forEach((ability, index) => {
      if (index === 0) return;
      if (!ability.isOnCooldown && ability.icon) {
        this.ctx.drawImage(
          ability.icon,
          this.canvas.width - CONFIG.ENEMY_ABILITY_SIZE - CONFIG.BUFF_MARGIN,
          this.canvas.height -
            CONFIG.ENEMY_ABILITY_SIZE * index -
            CONFIG.BUFF_MARGIN * index,
          CONFIG.ENEMY_ABILITY_SIZE,
          CONFIG.ENEMY_ABILITY_SIZE
        );
      }
    });
  }
}

customElements.define("enemy-card-canvas", EnemyCardCanvas);
