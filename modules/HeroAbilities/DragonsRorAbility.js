import { HeroAbility } from "./HeroAbility.js";
import { DragonsRoarBuff } from "../buffDebuff/DragonsRoarBuff.js";
import { ScaredDebuff } from "../buffDebuff/ScaredDebuff.js";

export class DragonsRoarAbility extends HeroAbility {
  static imgUrl = "ability-dragons-roar.jpeg";
  constructor(id, user) {
    super(id, user);
    this.abilityTitle = "Dragons Roar";
    this.img = DragonsRoarAbility.imgUrl;
    this.cooldown = 7;
    this.sfx = "ROAR";
    this.tooltipHTML = () => `
        <p>Der Krieger stösst einen gewaltigen Kriegsschrei heraus und erhöht dabei seine 
        <span class="bold-highlight">Angriffskraft</span>.
        Sollte sich ein Gegner in der Nähe befindet, wird dieser <span class="bold-highlight">eingeschüchtert</span>.
        </p>
        <br>
        ${DragonsRoarBuff.tooltip}
        <br>
        ${ScaredDebuff.tooltip}
      `;

    this.init();
  }

  use() {
    if (!this.canBeUsed) return;
    this.user.addBuffDebuff(DragonsRoarBuff);
    super.use();
    if (this.user?.currentTarget?.type === "lootCard") return;
    if (this.user.currentTarget)
      this.user.currentTarget.addBuffDebuff(ScaredDebuff);
  }
}

customElements.define("hdragons-roar-ability", DragonsRoarAbility);
