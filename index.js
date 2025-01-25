/* eslint-disable @typescript-eslint/no-magic-numbers */

// #region elements
const
  /** @type {countContainer} */countContainer = document.querySelector('#count-container'),
  /** @type {currentCount} */currentCount = countContainer.querySelector('#count-msg > span'),
  /** @type {cpsCount} */cpsCount = countContainer.querySelector('#cps-count-msg > span'),
  /** @type {shop} */shop = document.querySelector('#shop');
// #endregion elements

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

/** @type {shopItems} */const shopItems = {
  clickPerClick: {
    unlockCost: 50,
    level: 0,
    getCost: () => shopItems.clickPerClick.unlockCost * (shopItems.clickPerClick.level + 1),
    getIncrease: () => 1 + shopItems.clickPerClick.level
  },
  autoClick: {
    unlockCost: 100,
    level: 0,
    getCost: () => shopItems.autoClick.unlockCost * (shopItems.autoClick.level + 1),
    getIncrease: () => 0.5 * shopItems.autoClick.level
  }
};

let clickCountThisSec = 0;
setInterval(() => {
  const clicks = shopItems.autoClick.level * 0.5;
  if (clicks) clickCount += clicks;

  const cps = clickCountThisSec + clicks;
  if (cpsCount.textContent != cps) cpsCount.textContent = cps;
  clickCountThisSec = 0;
}, 1000);

function modifyCounter() {
  const newFontSize = (1 + Math.min(clickCount / 1000, clickCount ^ 0.5) / (10_000 + Math.max(clickCount ^ 0.5, 1))).toFixed(5);
  if (currentCount.style.fontSize.split('rem')[0] != newFontSize) currentCount.style.fontSize = `${newFontSize}rem`;

  currentCount.style.color = `hsl(${((clickCount / 250_000) * 240) + 240}, 100%, 50%)`;
}

function refreshShopUseabilities() {
  for (const shopButton of shop.children.namedItem('shop-items').childNodes) {
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
  clickCountThisSec += clicks;

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

  shopItems[event.target.id].run?.();
  shopItems[event.target.id].level++;
  clickCount -= cost;

  modifyCounter();
  refreshShopUseabilities();
}