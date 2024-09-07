import { HeroAbility } from "./HeroAbility.js";
import { sfxPlayer } from "../AudioPlayer.js";
import { BleedingDebuff } from "../buffDebuff/BleedingDebuff.js";

export class SwordThrustAbility extends HeroAbility {
  static imgUrl = "ability-blade-thrust.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Sword Thrust";
    this.img = SwordThrustAbility.imgUrl;
    this.cooldown = 4;
    this.sfx = "SWORD_THRUST";
    this.tooltipHTML = () => `
      <p>Der Krieger stösst das Schwert in den Feind, richtet dabei <span class="bold-highlight">Basis-Angriffsschaden</span>,
      zu und lässt das Ziel bluten.
      </p>
      <br>
       ${BleedingDebuff.tooltip}
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
    this.user.currentTarget.addBuffDebuff(BleedingDebuff);
    this.user.currentTarget.takeDamage(this.user.attack.current);
    super.use();
  }
}

customElements.define("sword-thrust-ability", SwordThrustAbility);
