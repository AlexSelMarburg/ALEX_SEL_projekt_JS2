export class ConsumableSlot extends HTMLElement {
  static template = document.createElement("template");

  static {
    ConsumableSlot.template.innerHTML = /*html*/ `
      <style>
          :host {
              width: 60px;
              height: 60px;
              border-radius: 4px;
              z-index: 6;
              background-image: url("../assets/img/backgrounds/textures/consumable-bg.png");      
            }
            
            .consumable-slot {
              padding-top: 3px;
              height: 60px;
              width: 60px;
              display: block;
          }

      </style>
      <div class="consumable-slot"></div>
    `;
  }

  constructor(id, owner) {
    super();
    this.id = id;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      ConsumableSlot.template.content.cloneNode(true)
    );
    this.item = null;
    this.owner = owner;
  }

  addConsumableItem(consumable) {
    const item = new consumable(this.owner);
    item.init(this);
    this.shadowRoot.querySelector(".consumable-slot").appendChild(item);
    this.item = item;
  }

  removeConsumableItem() {
    this.shadowRoot.querySelector(".consumable-slot").innerHTML = "";
    this.item = null;
  }
}

customElements.define("consumable-container", ConsumableSlot);
