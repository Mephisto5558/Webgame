/* eslint-disable @typescript-eslint/no-magic-numbers */

// #region elements
/** @type {HTMLDivElement} */
const countContainer = document.querySelector('#count-container');

/** @type {HTMLSpanElement} */
const currentCount = countContainer.querySelector('#count-msg > span');

/** @type {HTMLDivElement} */
const shop = document.querySelector('#shop');

// #endregion elements

// #region util funcs
/**
 * @param {Element | undefined} element
 * @returns {element is HTMLButtonElement}*/
const isButton = element => element?.nodeName == 'BUTTON';

// #endregion util funcs

Object.defineProperty(globalThis, 'clickCount', {
  get() { return Number.parseInt(currentCount.textContent); },
  set(val) { currentCount.textContent = val; }
});

/** @type {Record<string, {unlockCost: number, level: number, getCost: () => number, run?: () => never}>} */
const shopItems = {
  clickPerClick: {
    unlockCost: 50,
    level: 0,
    getCost: () => shopItems.clickPerClick.unlockCost * (shopItems.clickPerClick.level + 1)
  },
  autoClick: {
    unlockCost: 100,
    level: 0,
    getCost: () => shopItems.autoClick.unlockCost * (shopItems.autoClick.level + 1)
  }
};

function count() {
  clickCount += 1 + shopItems.clickPerClick.level;

  currentCount.title = `${currentCount.title.split(' ').slice(0, -1).join(' ')} ${Number.parseInt(currentCount.title.split(' ').at(-1)) + 1}`;

  const newFontSize = (1 + Math.min(clickCount / 1000, clickCount ^ 0.5) / (10_000 + Math.max(clickCount ^ 0.5, 1))).toFixed(5);
  if (currentCount.style.fontSize.split('rem')[0] != newFontSize) currentCount.style.fontSize = `${newFontSize}rem`;

  currentCount.style.color = `hsl(${((clickCount / 250_000) * 240) + 240}, 100%, 50%)`;

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

/** @param {MouseEvent}event */
function buyUpgrade(event) {
  if (!isButton(event.target)) return;

  const cost = shopItems[event.target.id].getCost(event.target);
  if (cost > clickCount)
    return Swal.fire('Not enough clicks', `You cannot afford this. It costs ${cost}, you only have ${clickCount}.`, 'error');

  shopItems[event.target.id].run?.();
  shopItems[event.target.id].level++;
  clickCount -= cost;
}