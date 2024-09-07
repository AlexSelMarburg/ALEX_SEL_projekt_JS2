import { HeroAbility } from "./HeroAbility.js";
import { InfuseLightBuff } from "../buffDebuff/InfuseLightBuff.js";

export class InfuseLightAbility extends HeroAbility {
  static imgUrl = "ability-infuse-light.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Infuse Light";
    this.img = InfuseLightAbility.imgUrl;
    this.cooldown = 6;
    this.sfx = "INFUSE_LIGHT";
    this.tooltipHTML = () => `
      <p>Der Templar segnet seinen Hammer mit Heiligem Licht.</p>
      <br>
      ${InfuseLightBuff.tooltip}
    `;

    this.init();
  }

  use() {
    if (!this.canBeUsed) return;
    this.user.addBuffDebuff(InfuseLightBuff);
    super.use();
  }
}

customElements.define("infuse-light-ability", InfuseLightAbility);
