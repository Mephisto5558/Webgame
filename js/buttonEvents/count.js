/** @type {import('./index.js')['count']} */
export function count() {
  stats.realClickCount++;

  const clicks = shopItems.clickPerClick.calc.getIncrease();
  clickCount += clicks;
}