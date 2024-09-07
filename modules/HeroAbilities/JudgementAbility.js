import { HeroAbility } from "./HeroAbility.js";
import { sfxPlayer } from "../AudioPlayer.js";

export class JudgementAbility extends HeroAbility {
  static imgUrl = "ability-judgement.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Judgement";
    this.img = JudgementAbility.imgUrl;
    this.cooldown = 3;
    this.effectValue = 3;
    this.sfx = "INFUSE_LIGHT";
    this.tooltipHTML = () => `
      <p>Die Waffe des Templars setzt eine große Menge an Heiliger Energie frei
      und fügt dem Ziel <span class="bold-highlight">Basis-Angriffsschaden</span>,
      sowie zusätzlich <span class="bold-highlight">${this.effectValue}</span> Heiligschaden zu.
      </p>
    `;

    this.init();
  }

  use() {
    if (this.canBeUsed && !this.user.currentTarget) {
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

customElements.define("judgement-ability", JudgementAbility);
