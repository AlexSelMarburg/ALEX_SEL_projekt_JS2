import { HeroCard } from "./HeroCard.js";
import { InfuseLightAbility } from "../HeroAbilities/InfuseLightAbility.js";
import { HolyShieldAbility } from "../HeroAbilities/HolyShieldAbility.js";
import { HammerSlamAbility } from "../HeroAbilities/HammerSlamAbility.js";
import { JudgementAbility } from "../HeroAbilities/JudgementAbility.js";

export class TemplarCard extends HeroCard {
  static data = {
    img: "assets/img/hero/templar.png",
    portraitImage: "assets/img/hero/templar-portrait.png",
    imgScale: 6.2,
    defaultBgImage: "assets/img/backgrounds/hero/templar-bg.jpeg",
    abilities: [
      HolyShieldAbility,
      InfuseLightAbility,
      JudgementAbility,
      HammerSlamAbility,
    ],
    className: "Templar",
    entityName: "Belmont",
    hp: 26,
    armor: 6,
    attack: 6,
    magicAttack: 0,
  };

  constructor(heroData) {
    super(TemplarCard.data, heroData);
    this.deathSFX = "MALE_HERO_DEATH";

    this.hp = this.initializeAttribute(heroData?.hp, TemplarCard.data.hp);
    this.armor = this.initializeAttribute(
      heroData?.armor,
      TemplarCard.data.armor
    );
    this.attack = this.initializeAttribute(
      heroData?.attack,
      TemplarCard.data.attack
    );
    this.magicAttack = this.initializeAttribute(
      heroData?.magicAttack,
      TemplarCard.data.magicAttack
    );
  }
}

customElements.define("templar-card", TemplarCard);
