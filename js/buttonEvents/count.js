/** @type {import('.')['count']} */
globalThis.count = function count() {
  stats.realClickCount++;

  const clicks = shopItems.clickPerClick.calc.getIncrease();
  clickCount += clicks;
};