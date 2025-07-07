Object.defineProperty(NodeList.prototype, 'namedItem', {
  /* eslint-disable-next-line unicorn/no-null -- same as HTMLCollection#namedItem */
  value: function (name) { return [...this].find(e => e.id == name || e.name == name) ?? null; }
});

export const
  /** @type {countContainer} */ countContainer = document.querySelector('#count-container'),
  /** @type {cpsCountSpan} */ cpsCountSpan = countContainer.querySelector('#cps-count-msg > span'),
  /** @type {shop} */ shop = document.querySelector('#shop'),
  /** @type {NodeListOf<import('./shop').ShopItem['levelOverviewSpan']>} */ shopLevelContainer = shop.querySelectorAll('#level-overview > ul > li > span'),
  /** @type {statsListElem} */ statsListElem = document.querySelector('header > #stats-container > #stats-list');


/** @type {HTMLSpanElement} */ const currentCount = countContainer.querySelector('#count-msg > span');

let internalClickCount = 0;
Object.defineProperty(globalThis, 'clickCount', {
  get() { return internalClickCount; },
  set(val) {
    internalClickCount = val;

    for (const shopItem of Object.values(shopItems)) shopItem.refreshUseabilities();

    currentCount.textContent = val.toLocaleString();

    const newFontSize = (1 + Math.min(val / 1000, val ^ 0.5) / (10_000 + Math.max(val ^ 0.5, 1))).toFixed(5);
    if (currentCount.style.fontSize.split('rem')[0] != newFontSize) currentCount.style.fontSize = `${newFontSize}rem`;

    const newColor = `hsl(${Math.round((val / 250_000) * 240 + 240)}, 100%, 50%)`;
    if (currentCount.style.color != newColor) currentCount.style.color = newColor;
  }
});