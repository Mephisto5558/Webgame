import { createElement } from '../utils/index.js';
import { shop } from '../constants.js';

/** @typedef {import('.').BaseShopItem}T_BaseShopItem*/

/** @type {HTMLUListElement} */ const shopItemContainer = shop.querySelector('#shop-items > ul');
/** @type {HTMLUListElement} */ const levelOverviewContainer = shop.querySelector('#level-overview > ul');

export class BaseShopItem {
  id; name;
  unlockCost = 0;
  /** @type {T_BaseShopItem['levelOverviewSpan']}*/ levelOverviewSpan;
  /** @type {T_BaseShopItem['levelUpButton']}*/ levelUpButton;
  #level = 0;

  get level() {
    return this.#level;
  }

  set level(val) {
    this.#level = val;
    this.levelOverviewSpan.textContent = val || ''; // 0 shall not be shown
  }

  get unlocked() {
    return this.level > 0 || clickCount >= this.unlockCost / 2;
  }

  get affordable() {
    if (!this.unlocked) return clickCount >= this.unlockCost;
    return clickCount >= this.calc.getCost();
  }

  /** @type {T_BaseShopItem['calc']} */
  calc = {
    getCost: () => this.unlockCost * (this.level + 1),
    getIncrease: () => this.level + 1
  };

  addToDOM() {
    this.levelUpButton = createElement(
      'button',
      { id: this.id, textContent: this.name, className: this.level ? 'unlocked' : undefined },
      createElement('li', undefined, shopItemContainer)
    );

    const hoverInfo = createElement(
      'p',
      { id: 'hover-info', innerHTML: "Cost: <span id='cost'></span><br>Clicks: <span id='clicks'></span>" },
      createElement('div', { className: 'hover-info-container' }, this.levelUpButton)
    );

    const costElem = hoverInfo.children.namedItem('cost');
    const clicksElem = hoverInfo.children.namedItem('clicks');
    this.levelUpButton.addEventListener('mouseenter', () => {
      const cost = this.calc.getCost();
      const increase = this.calc.getIncrease();

      // strictly checking due to 0 == '';
      if (Number.parseInt(costElem.textContent) !== cost) costElem.textContent = cost;
      if (Number.parseInt(clicksElem.textContent) !== increase) clicksElem.textContent = increase;
    });

    this.levelOverviewSpan = createElement(
      'span',
      { id: `level-${this.id}`, textContent: this.level || '' },
      createElement('li', { id: this.id, textContent: this.name }, levelOverviewContainer)
    );

    return this;
  }

  refreshUseabilities() {
    if (!this.levelUpButton.classList.contains('unlocked') && this.unlocked)
      this.levelUpButton.classList.add('unlocked');

    if (this.affordable)
      this.levelUpButton.classList.add('affordable');
    else if (this.levelUpButton.classList.contains('affordable'))
      this.levelUpButton.classList.remove('affordable');
  }

  /**
   * @param {T_BaseShopItem['id']}id
   * @param {T_BaseShopItem['name']}name
   * @param {T_BaseShopItem['unlockCost']}unlockCost */
  constructor(id, name, unlockCost = 0) {
    this.id = id;
    this.name = name;
    this.unlockCost = unlockCost;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level
    };
  }
}