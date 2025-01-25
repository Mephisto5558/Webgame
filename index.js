/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-magic-numbers */

// #region elements
const
  /** @type {countContainer} */countContainer = document.querySelector('#count-container'),
  /** @type {currentCount} */currentCount = countContainer.querySelector('#count-msg > span'),
  /** @type {cpsCount} */cpsCount = countContainer.querySelector('#cps-count-msg > span'),
  /** @type {shop} */shop = document.querySelector('#shop'),
  /** @type {shopLevelContainer} */shopLevelContainer = shop.querySelectorAll('#level-overview > ul > li > span');
// #endregion elements

Object.defineProperty(NodeList.prototype, 'namedItem', {
  /* eslint-disable-next-line unicorn/no-null -- same as HTMLCollection#namedItem*/
  value: function (name) { return [...this].find(e => e.id == name || e.name == name) ?? null; }
});

// #region util funcs
/** @type {isButton}*/const isButton = element => element?.nodeName == 'BUTTON';
// #endregion util funcs

let __internalClickCount = 0;
Object.defineProperty(globalThis, 'clickCount', {
  get() { return __internalClickCount; },
  set(val) {
    __internalClickCount = val;
    currentCount.textContent = val;
  }
});

const baseShopItem = {
  /** @type {(item: ShopOptions) => never} */
  getCost: item => shopItems[item].unlockCost * (shopItems[item].level + 1),

  /** @type {(item: ShopOptions) => never} */
  getIncrease: item => 1 + shopItems[item].level,

  addLevel: item => {
    shopItems[item].level++;

    const shopLevelItem = shopLevelContainer.namedItem(`level-${item}`);
    shopLevelItem.textContent = (Number.parseInt(shopLevelItem.textContent) + 1) || 1;
  }
};

/** @type {shopItems} */const shopItems = Object.fromEntries(Object.entries({
  clickPerClick: {
    unlockCost: 50,
    level: 0
  },
  autoClick: {
    unlockCost: 100,
    level: 0
  }
}).map(([k, v]) => [k, {
  getCost: v.getCost ?? baseShopItem.getCost.bind(undefined, k),
  getIncrease: v.getIncrease ?? baseShopItem.getIncrease.bind(undefined, k),
  addLevel: v.addLevel ?? baseShopItem.addLevel.bind(undefined, k),
  ...v
}]));

setInterval(() => {
  const clicks = shopItems.autoClick.level * 0.5;
  if (clicks) clickCount += clicks;
}, 1000);

let oldClickCount = clickCount;
setInterval(() => {
  const cps = clickCount - oldClickCount;
  if (cpsCount.textContent != cps) cpsCount.textContent = cps;
  oldClickCount = clickCount;
}, 1000);

function modifyCounter() {
  const newFontSize = (1 + Math.min(clickCount / 1000, clickCount ^ 0.5) / (10_000 + Math.max(clickCount ^ 0.5, 1))).toFixed(5);
  if (currentCount.style.fontSize.split('rem')[0] != newFontSize) currentCount.style.fontSize = `${newFontSize}rem`;

  currentCount.style.color = `hsl(${((clickCount / 250_000) * 240) + 240}, 100%, 50%)`;
}

const shopButtons = shop.querySelectorAll('#shop-items > ul > li > button');
function refreshShopUseabilities() {
  for (const shopButton of shopButtons) {
    if (!isButton(shopButton)) continue;
    if (!shopButton.classList.contains('unlocked')) {
      if (shopItems[shopButton.id].unlockCost / 2 <= clickCount) shopButton.classList.add('unlocked');
    }
    else if (shopButton.classList.contains('affordable')) {
      if (shopItems[shopButton.id].getCost() > clickCount) shopButton.classList.remove('affordable');
    }
    else if ((shopItems[shopButton.id].level > 0 ? shopItems[shopButton.id].getCost() : shopItems[shopButton.id].unlockCost) <= clickCount)
      shopButton.classList.add('affordable');
  }
}

function count() {
  const clicks = shopItems.clickPerClick.getIncrease();
  clickCount += clicks;

  currentCount.title = `${currentCount.title.split(' ').slice(0, -1).join(' ')} ${Number.parseInt(currentCount.title.split(' ').at(-1)) + 1}`;

  modifyCounter();
  refreshShopUseabilities();
}

/** @type {import('.').functs['buyUpgrade']} */
function buyUpgrade(event) {
  if (!isButton(event.target)) return;

  const cost = shopItems[event.target.id].getCost(event.target);
  if (cost > clickCount)
    return void Swal.fire('Not enough clicks', `You cannot afford this. It costs ${cost}, you only have ${clickCount}.`, 'error');

  clickCount -= cost;
  shopItems[event.target.id].run?.();
  shopItems[event.target.id].addLevel();

  modifyCounter();
  refreshShopUseabilities();
}