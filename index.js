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
    unlockCost: 50
  },
  autoClick: {
    unlockCost: 100
  }
}).map(([k, v]) => [k, {
  getCost: v.getCost ?? baseShopItem.getCost.bind(undefined, k),
  getIncrease: v.getIncrease ?? baseShopItem.getIncrease.bind(undefined, k),
  addLevel: v.addLevel ?? baseShopItem.addLevel.bind(undefined, k),
  level: v.level ?? 0,
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

  const newColor = `hsl(${Math.round((clickCount / 250_000) * 240 + 240)}, 100%, 50%)`;
  if (currentCount.style.color != newColor) currentCount.style.color = newColor;
}

const shopButtons = shop.querySelectorAll('#shop-items > ul > li > button');

const div = document.createElement('div');
div.classList.add('hover-info-container');
div.innerHTML = "<p id='hover-info'>Cost: <span id='cost'></span><br>Clicks: <span id='clicks'></span></p>";

for (const shopButton of shopButtons) {
  if (!isButton(shopButton)) continue;

  const hoverDiv = div.cloneNode(true);
  const costElem = hoverDiv.children.namedItem('hover-info').children.namedItem('cost');
  const clicksElem = hoverDiv.children.namedItem('hover-info').children.namedItem('clicks');

  shopButton.addEventListener('mouseenter', () => {
    if (costElem.textContent != shopItems[shopButton.id].getCost()) costElem.textContent = shopItems[shopButton.id].getCost();
    if (clicksElem.textContent != shopItems[shopButton.id].getIncrease()) clicksElem.textContent = shopItems[shopButton.id].getIncrease();
  });

  shopButton.append(hoverDiv);
}

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
  if (cost > clickCount) return;

  clickCount -= cost;
  shopItems[event.target.id].run?.();
  shopItems[event.target.id].addLevel();

  modifyCounter();
  refreshShopUseabilities();
}