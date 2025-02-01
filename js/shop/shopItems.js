import { BaseShopItem } from './baseShopItem.js';

/** @typedef {import('./index.js').ShopItem}T_ShopItem*/


export class ShopItem extends BaseShopItem {
  /**
   * @param {T_ShopItem['id']}id
   * @param {T_ShopItem['name']}name
   * @param {T_ShopItem['unlockCost']}unlockCost
   * @param {import('./index.js').CalcMethods | undefined}calcMethods */
  constructor(id, name, unlockCost, calcMethods) {
    super(id, name, unlockCost);

    if (calcMethods) for (const [k, fn] of Object.entries(calcMethods)) this.calc[k] = fn.bind(this);
  }
}

let i = 0;
const items = [
  new ShopItem('clickPerClick', 'Click per click', i += 50),
  new ShopItem('autoClick', 'Clicks per second', i += 50, {
    getIncrease() { return this.level / 2; }
  })
];

void i; // Prevent eslint error with not using `i`

/** @type {shopItems} */
globalThis.shopItems = items.reduce((acc, e) => {
  acc[e.id] = e.addToDOM();
  return acc;
}, {});