import { HeroCard } from "./HeroCard.js";
import { SwordSlashAbility } from "../HeroAbilities/SwordSlashAbility.js";
import { SwordThrustAbility } from "../HeroAbilities/SwordThrustAbility.js";
import { ExecuteAbility } from "../HeroAbilities/ExecuteAbility.js";
import { DragonsRoarAbility } from "../HeroAbilities/DragonsRorAbility.js";

export class WarriorCard extends HeroCard {
  static data = {
    img: "assets/img/hero/warrior.png",
    portraitImage: "assets/img/hero/warrior-portrait.png",
    imgScale: 6.2,
    defaultBgImage: "assets/img/backgrounds/hero/templar-bg.jpeg",
    abilities: [
      DragonsRoarAbility,
      ExecuteAbility,
      SwordThrustAbility,
      SwordSlashAbility,
    ],
    className: "Warrior",
    entityName: "Yorik",
    hp: 32,
    armor: 5,
    attack: 8,
    magicAttack: 0,
  };

  constructor(heroData) {
    super(WarriorCard.data, heroData);
    this.deathSFX = "MALE_HERO_DEATH";

    this.hp = this.initializeAttribute(heroData?.hp, WarriorCard.data.hp);
    this.armor = this.initializeAttribute(
      heroData?.armor,
      WarriorCard.data.armor
    );
    this.attack = this.initializeAttribute(
      heroData?.attack,
      WarriorCard.data.attack
    );
    this.magicAttack = this.initializeAttribute(
      heroData?.magicAttack,
      WarriorCard.data.magicAttack
    );
  }
}

customElements.define("warrior-card", WarriorCard);
