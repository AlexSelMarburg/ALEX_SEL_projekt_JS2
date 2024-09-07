import { HeroAbility } from "./HeroAbility.js";
import { HolyShieldBuff } from "../buffDebuff/HolyShieldBuff.js";

export class HolyShieldAbility extends HeroAbility {
  static imgUrl = "ability-holy-shield.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Holy Shield";
    this.img = HolyShieldAbility.imgUrl;
    this.cooldown = 6;
    this.sfx = "FORTIFY";
    this.tooltipHTML = () => `
        <p>Der Templar segnet sein Schild mit dem <span class="bold-highlight">${HolyShieldBuff.name}</span> buff.</p>
        <br>
        ${HolyShieldBuff.tooltip}
      `;

    this.init();
  }

  use() {
    if (!this.canBeUsed) return;
    this.user.addBuffDebuff(HolyShieldBuff);
    super.use();
  }
}

customElements.define("holy-light-ability", HolyShieldAbility);
