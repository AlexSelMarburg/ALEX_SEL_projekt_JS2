import { sfxPlayer } from "../AudioPlayer.js";
import { HeroAbility } from "./HeroAbility.js";

export class SwordSlashAbility extends HeroAbility {
  static imgUrl = "ability-sword-slash.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Sword Slash";
    this.img = SwordSlashAbility.imgUrl;
    this.cooldown = 1;
    this.effectValue = 1;
    this.sfx = "SWORD_SLASH";
    this.tooltipHTML = () => `
      <p>Der Krieger schlägt mit dem Schwert zu und verursacht <span class="bold-highlight">Basis-Angriffsschaden</span>,
      sowie zusätzlich <span class="bold-highlight">${this.effectValue}</span> physischen Schaden zu.
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
    this.user.currentTarget.takeDamage(
      this.user.attack.current + this.effectValue
    );
    super.use();
  }
}

customElements.define("sword-slash-ability", SwordSlashAbility);
