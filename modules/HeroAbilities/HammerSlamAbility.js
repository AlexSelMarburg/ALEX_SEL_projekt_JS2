import { sfxPlayer } from "../AudioPlayer.js";
import { HeroAbility } from "./HeroAbility.js";

export class HammerSlamAbility extends HeroAbility {
  static imgUrl = "ability-hammer-slam.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Hammer Slam";
    this.img = HammerSlamAbility.imgUrl;
    this.cooldown = 1;
    this.effectValue = 1;
    this.sfx = "HAMMER_SLAM";
    this.tooltipHTML = () => `
      <p>Der Templar schlägt mit dem Hammer zu und verursacht <span class="bold-highlight">Basis-Angriffsschaden</span>,
      sowie zusätzlich <span class="bold-highlight">${this.effectValue}</span> Heiligschaden zu.
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
    this.user.currentTarget.takeDamage(this.user.attack.current);
    this.user.currentTarget.takeMagicDamage(
      this.effectValue + this.user.magicAttack.current
    );
    super.use();
  }
}

customElements.define("hammer-slam-ability", HammerSlamAbility);
