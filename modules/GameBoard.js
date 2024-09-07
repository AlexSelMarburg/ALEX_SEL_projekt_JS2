import { sfxPlayer } from "./AudioPlayer.js";

const style = document.createElement("style");
style.textContent = `@import "../css/board/game-board.css";`;

export class GameBoard extends HTMLElement {
  static template = document.createElement("template");

  static {
    GameBoard.template.innerHTML = /*html*/ `
      <div id="game-board">
        <div id="enemies-container">
          <div id="enemies-row--0" class="enemies-row">
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
          </div>
          <div id="enemies-row--1" class="enemies-row">
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
          </div>
          <div id="enemies-row--2" class="enemies-row">
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
            <div class="enemy-pos"></div>
          </div>
        </div>
        <div id="hero-pos-container">
          <div id="hero-pos--0" class="hero-pos" data-pos="0"></div>
          <div id="hero-pos--1" class="hero-pos" data-pos="1"></div>
          <div id="hero-pos--2" class="hero-pos" data-pos="2"></div>
        </div>
      </div>
    `;
  }

  constructor(heroCard) {
    super();
    this.heroCard = heroCard;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(GameBoard.template.content.cloneNode(true));
    this.shadowRoot.append(this.canvas, style.cloneNode(true));
  }

  connectedCallback() {
    this.initPlayerPositionsDragAndDrop();
  }

  initPlayerPositionsDragAndDrop() {
    const heroPos = this.shadowRoot.querySelectorAll(".hero-pos");
    heroPos.forEach((container) => {
      container.addEventListener("dragover", () => {
        const thisPos = container.dataset.pos;
        if (this.isValidHeroMove(thisPos)) {
          sfxPlayer.play("PLACE_HERO");
          container.appendChild(this.heroCard);
        }
      });
    });
  }

  isValidHeroMove(position) {
    return (
      this.heroCard.canMove &&
      !(
        (this.heroCard.position == 0 && position == 2) ||
        (this.heroCard.position == 2 && position == 0)
      )
    );
  }

  placeHeroCard() {
    if (this.heroCard.position == 1) return;
    sfxPlayer.play("PLACE_HERO");
    const startPosition = this.shadowRoot.querySelector("#hero-pos--1");
    startPosition.appendChild(this.heroCard);
    this.heroCard.position = 1;
  }

  placeBossCard(card) {
    const bossCell = this.shadowRoot.querySelector(
      `#enemies-row--2 .enemy-pos:nth-child(2)`
    );
    sfxPlayer.play("PLACE_HERO");
    bossCell.appendChild(card);
  }

  placeEnemyRow(rowNumber, enemies) {
    const enemyRowCells = this.shadowRoot.querySelectorAll(
      `#enemies-row--${rowNumber} .enemy-pos`
    );
    sfxPlayer.play("PLACE_CARD");
    enemyRowCells.forEach((cell, index) => {
      if (enemies[index]) {
        cell.appendChild(enemies[index]);
      }
    });
  }

  removeFrontRow() {
    const enemyRowCells = this.shadowRoot.querySelectorAll(
      `#enemies-row--${2} .enemy-pos`
    );

    sfxPlayer.play("REMOVE_WAVE");
    enemyRowCells.forEach((cell) => {
      const card = cell.firstChild;
      if (card) card.remove();
      cell.innerHTML = "";
    });
  }
}
customElements.define("game-board", GameBoard);
