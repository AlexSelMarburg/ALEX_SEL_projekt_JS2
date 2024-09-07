import { sfxPlayer } from "../AudioPlayer.js";
import { HeroAbility } from "./HeroAbility.js";

export class ExecuteAbility extends HeroAbility {
  static imgUrl = "ability-execute.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Execute";
    this.img = ExecuteAbility.imgUrl;
    this.cooldown = 6;
    this.effectValue = 5;
    this.sfx = "EXECUTE";
    this.tooltipHTML = () => `
      <p>Der Krieger versucht seinen Gegner hinzurichten und verursacht dabei <span class="bold-highlight">Angriffskraft</span>,
      und zusätzlich <span class="bold-highlight">bis zu ${this.effectValue}</span> physischen Schaden zu.
      </p>
    `;

    this.init();
  }

  use() {
    if (!this.user.currentTarget && this.canBeUsed) {
      sfxPlayer.play("SKIP");
      this.user.endHeroTurn();
      return;
    }

    if (!this.user.currentTarget) return;
    if (this.user.currentTarget.type === "lootCard") return;
    if (!this.canBeUsed) return;

    const damage =
      Math.floor(
        Math.random() *
          (this.user.attack.current +
            this.effectValue -
            this.user.attack.current +
            1)
      ) + this.user.attack.current;

    this.user.currentTarget.takeDamage(damage);
    super.use();
  }
}

customElements.define("execute-ability", ExecuteAbility);
