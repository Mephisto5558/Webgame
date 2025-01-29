/** @type {import('.')['count']} */
globalThis.count = function count() {
  const clicks = shopItems.clickPerClick.calc.getIncrease();
  clickCount += clicks;
};